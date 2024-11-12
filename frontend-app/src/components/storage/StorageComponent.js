import {useState} from "react";
import "./storage.css"
import {ProductImage} from "../products/ProductImage";


function StorageLeft({pr, onArrow}) {
    const whenClicked = () => {
        if (pr.remaining > 0) {
            onArrow()
        }
    }
    return (
        <div className={`flex store-left flex-row justify-between st-left-wrap ${pr.remaining <= 0 && 'out'}`}>
            <div className={"flex flex-row w-full"}>
                <ProductImage size={"s-70"} pictureUrl={pr.product.pictureUrl} name={pr.product.name} />
                <div className={"p-2"}>
                    <p className={"storage-im-text"}>{pr.product.name}</p>
                    <p className={"storage-im-text"}>In stock: {pr.remaining}</p>
                </div>
            </div>
            <div onClick={whenClicked} className={"flex flex-col h-full justify-center store-right"}>
                ➡️
            </div>
        </div>
    )
}

function StorageRightMovement({init, shops, onSelect}) {
    if (!init) {
        init = -1;
    }
    const err = init === -1;
    return (
        <div className={"flex"}>
            <p className={"mr-2"}>To:</p>
            <select value={init} className={`gen-input ${err && "gen-error"}`} onChange={(e)=>onSelect(e.target.value)}>
                <option disabled value={-1}>Select shop</option>
                {
                    shops.map((s) => (
                        <option value={s.id}>{s.name}</option>
                    ))
                }
            </select>
        </div>
    )
}
function StorageRightLoss({init, comment, reasons, onSelect, onComment}) {
    if (!init) {
        init = -1;
    }
    const err = init === -1;
    return (
        <div className={"flex gap-x-2"}>
            <select value={init}
                    className={`gen-input ${ err && "gen-error" }`}
                    onChange={(e)=>onSelect(e.target.value)}>
                <option disabled value={-1}>Select reason</option>
                {
                    reasons.map((r) => (
                        <option value={r.id}>{r.title}</option>
                    ))
                }
            </select>
            <input type={"text"} className={"gen-input"} placeholder={"Comment"} value={comment} onChange={onComment} />
        </div>
    )
}
function StorageRightWrap({element, onUpdate, product, onProductChange, onRemove, shops, reasons}) {
    const onTypeChange = (newType) => {
        element.type = newType
        onUpdate(element);
    }

    const [errorAmount, setErrorAmount] = useState(false);
    const onAmountChange = (amount) => {
        console.log(`amount=${amount}`)
        if (amount === 0) {
            setErrorAmount(true);
        }
        else if (amount < 0) {
            return
        } else if (errorAmount) {
            setErrorAmount(false);
        }
        let delta = amount - element.amount
        if (delta > 0) {
            if (product.remaining < delta) {
                delta = product.remaining
                amount = parseInt(element.amount) + product.remaining
                console.log(`amount=${amount}`)
                console.log(`delta=${delta}`)
            }
        }
        product.remaining -= delta
        element.amount = amount
        onUpdate(element);
        onProductChange(product)
    }
    const handleCancel = () => {
        product.remaining = product.remaining + element.amount
        onProductChange(product)
        onRemove(element);
    }
    const handleIncrement = () => {
        onAmountChange(element.amount+1);
    }
    const handleDecrement = () => {
        onAmountChange(element.amount-1);
    }

    function handleTop() {
        onAmountChange(element.amount + product.remaining);
    }

    function onShopSelect(shopId) {
        element.shopId = shopId;
        onUpdate(element);
    }
    function onReasonSelect(rId) {
        element.reasonId = rId
        onUpdate(element);
    }

    function onCommentChange(cmd) {
        element.comment = cmd
        onUpdate(element);
    }

    return (
        <div className={"right-wrap"}>
            <select className={"gen-input store-select store-pan-1"} onChange={(e)=>onTypeChange(e.target.value)}>
                <option value={"movement"}>Move</option>
                <option value={"loss"}>Lose</option>
            </select>
            <div className={"store-pan-2 flex justify-center"}>
            {
                element.type === "loss" && (<StorageRightLoss init={element.reasonId}
                                                              onSelect={onReasonSelect}
                                                              reasons={reasons}
                                                              comment={element.comment}
                                                              onComment={onCommentChange}
                />)
            }
            {
                element.type === "movement" && (<StorageRightMovement
                    init={element.shopId}
                    shops={shops}
                    onSelect={onShopSelect} />)
            }
            </div>
            <div className={"flex gap-2 store-pan-3"}>
                <button className="cancel-button selected-on-text" onClick={handleCancel}>❌</button>
                <button className={`decrement-button selected-on-text`} onClick={handleDecrement}>⬇️</button>
                <input
                    type="number"
                    value={element.amount}
                    onChange={(e)=>onAmountChange(e.target.value)}
                    min="1"
                    className={`amount-input gen-input ${errorAmount && 'gen-error'}`}
                />
                <button className="increment-button selected-on-text" onClick={handleIncrement}>⬆️</button>
                <button className="cancel-button selected-on-text" onClick={handleTop}>🔼</button>
            </div>

        </div>
    )

}

function StorageRight({elements, updateElements, product, updateProduct, shops, reasons}) {
    const elEq = (e1, e2) => {
        return e1.index === e2.index;
    }
    const onUpdateElement = (newElement) => {
        console.log(newElement);
        console.log(elements);
        const target = elements.find((e)=>elEq(e,newElement))
        if (target === undefined) {
            return;
        }
        const deltaAmount = newElement.amount - target.amount
        product.remaining += deltaAmount
        updateElements(elements.map((el) => {
            if (elEq(el, newElement)) {
                return newElement;
            } else {
                return el;
            }
        }));
        updateProduct(product);
    }
    const onRemoveElement = (element) => {
        updateElements(elements.filter((e)=>!elEq(e, element)))
    }
    const displayElements = elements.filter((e)=>e.origin===product.product.id);
    return (
    <div className={"st-right-wrap"}>
        {
            displayElements.map((el) => (<StorageRightWrap element={el} reasons={reasons}
                                                    onUpdate={onUpdateElement}
                                                    onRemove={onRemoveElement}
                                                    shops={shops}
                                                    product={product}
                                                    onProductChange={updateProduct}

            />))
        }
    </div>
    )
}
export function StorageComponent({   remainingProduct, shops,
                                     elements, setElements, reasons, index, setIndex,
    }) {
    const [product, setProduct] = useState(remainingProduct);

    const onArrow = () => {
        const newElement = {
            origin: product.product.id,
            index: index,
            type: 'movement',
            amount: 1,
            shopId: -1,
            reasonId: -1,
            comment: ''
        }
        setIndex(index+1)
        setProduct({product: product.product, remaining: product.remaining-1 })
        setElements([...elements, newElement])
    }
    return (
        <div className={"storage-frame"}>
            <div className={"flex w-full flex-row items-start"}>
                <StorageLeft pr={product} onArrow={onArrow}></StorageLeft>
                <StorageRight
                    elements={elements}
                    updateElements={setElements}
                    product={product}
                    updateProduct={setProduct}
                    shops={shops}
                    reasons={reasons}
                ></StorageRight>
            </div>
        </div>
    )
}