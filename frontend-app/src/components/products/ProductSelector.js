import {useEffect, useState} from "react";
import ProductComponent from "./ProductComponent";
import SelectedProduct from "./SelectedProduct";
import './product.css'
import './../../index.css'
import './../../static_controls/inputs.css'
import {formatPrice} from "../../utils/date";
import './../themed/themed.css';
import {calculatePrice} from "./Price";
import {getStocksByShopId} from "../../connect/connectStocks";
import {GlobalLoading} from "../common/loading/GlobalLoading";
import {GlobalError} from "../common/errors/GlobalError";
import {all} from "axios";


function ProductSelector({confirmAction, theme, mode, errors, shopId, children, isDelivery}) {
    const [selectedProducts, setSelectedProducts] = useState([])
    const [searchPrompt, setSearchPrompt] = useState('')
    const [stocks, setStocks] = useState([])
    const [localError, setLocalError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    useEffect(()=>{

        getStocksByShopId(shopId).then(
            (s) => {
                if (s.success) {
                    const data = s.data
                    const newStocks = data.map((d)=>({id: d.product.id, remaining: d.remaining}))
                    setStocks(newStocks)
                    const allProducts = data.map((d) => d.product)
                    setLoading(false)
                    const prd = allProducts.map(
                        (p)=>({ product: p, checked: false }))

                    setProducts(prd)
                    setAllProducts(allProducts)
                } else {
                    setLocalError(s.error)
                }
            }
        )
    }, [shopId])

    const useStocks = shopId != null

    const stockMap = new Map();
    if (useStocks) {
        stocks.forEach((s) => stockMap.set(s.id, s.remaining))
    }
    const getPrice = (pr) => {
        return isDelivery ? pr.deliveryPrice : pr.price;
    }
    const onAddProduct = (product) => {
        if (!product) {
            return
        }
        const existing = selectedProducts.find((s) => s.product.id === product.id);
        if (existing) {
            const newSelectedProducts = selectedProducts.map((s) => {
                if (s.product.id===product.id) {
                    return { product: product, amount: 1 }
                } else {
                    return s
                }
            });

            setSelectedProducts(newSelectedProducts);
        } else {
            setSelectedProducts([...selectedProducts, { product: product, amount: 1 }])
        }
        const newProducts = products.map((ch_p) => {
            if (ch_p.product.id === product.id) {
                return { product: ch_p.product, checked: true };
            } else {
                return ch_p;
            }
        });

        setProducts(newProducts);
    }

    const onCancelProduct = (product) => {
        if (!product) {
            return
        }
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((element) => element.product.id !== product.id)
        );
        const newProducts = products.map((ch_p) => {
            if (ch_p.product.id === product.id) {
                return { product: ch_p.product, checked: false };
            } else {
                return ch_p;
            }
        });
        setProducts(newProducts);
    }

    const cancelAll = () => {
        setProducts(allProducts.map(
            (p)=>({product: p, checked: false})))
        setSelectedProducts([]);
    }
    const onChangeAmount = (id, amount) => {
        const newSelectedProducts = selectedProducts.map((ch_p) => {
            if (ch_p.product.id === id) {
                return { product: ch_p.product, amount: amount };
            } else {
                return ch_p;
            }
        });
        setSelectedProducts(newSelectedProducts);
    }
    const onSearch = () => {
        const prompt = searchPrompt.trim().toLowerCase()
        setProducts(allProducts.filter(pr => pr.name.toLowerCase().indexOf(prompt) > -1)
            .map(
                (p)=>(
                    {
                        product: p,
                        checked: selectedProducts.filter((p2)=>(p2.product.id===p.id)).length > 0
                    }
                    )
            )
        )
    }
    const onConfirm = () => {
        if (confirmAction) {
            confirmAction(selectedProducts)
        }
    }
    const onTextChange = (e) => {
        const val = e.target.value
        setSearchPrompt(val)
    }

    const titleText =    mode === "sale" ? "Sale products" :
                                mode === "supply" ? "Supply products" :
                                mode === "loss" ? "Product loss" :
                                 "Product selector"
    const hasErrors = errors !== null
    const errorMap = new Map();
    if (hasErrors) {
        const specific = errors.productSpecific
        specific.forEach((err) => errorMap.set(err.id, err.message))
    }
    if (loading) {
        return <GlobalLoading />
    }
    if (localError) {
        return <GlobalError text={localError} />
    }


    return (
        <div className={"product-selector-main"}>
            <div className={"flex w-full"}>
                <div className={"flex flex-row w-1/2 products-upper h-full"}>
                    <h2 className={`product-operation themed-text ${theme}`}>{titleText}</h2>
                    <input
                        type="text"
                        value={searchPrompt}
                        placeholder="Product name"
                        className={"gen-input w-1/2 mx-2"}
                        onChange={onTextChange}
                    />
                    <button onClick={onSearch} className={`gen-button ${theme}`}>Search</button>
                </div>
                <div className={"flex flex-row w-1/2"}>
                    {
                        hasErrors && <div className={"selected-errors bg-red-100"}>{errors.primaryError}</div>
                    }
                </div>
            </div>
            <div className={"flex w-full"}>
                {
                    children
                }
            </div>
            <div className={"flex flex-row"}>
                <div className={"product-grid-wrapper"}>
                    <div className="product-grid">
                        {products.map((ch_p, index) => (
                            <ProductComponent
                                              key = {index}  product={ch_p.product}
                                              getPrice={getPrice}
                                              is_added={ch_p.checked}
                                              onAdd={onAddProduct}
                                              onCancel={onCancelProduct}
                                              inStock={useStocks ? stockMap.get(ch_p.product.id) : -1}
                                              theme={theme}  />
                        ))}
                    </div>
                </div>
                <div className={"w-1/2 h-full"}>
                    <div className={"right-pane-wrapper"}>
                        <p className={`selected-items-text themed-text ${theme}`}>Selected items</p>
                        <div className={"selected-items-wrapper"}>
                            {
                                selectedProducts.map((selected, index) => (
                                    <SelectedProduct key={index} product={selected.product}
                                                     initAmount = {selected.amount}
                                                     onAmountChange={onChangeAmount}
                                                     onCancel={onCancelProduct}
                                                     getPrice={getPrice}
                                                     errorType={
                                    errorMap.has(selected.product.id) ? errorMap.get(selected.product.id) : ""}/>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <p className={"mx-2 total-text"}>Total: {
                        formatPrice(
                        calculatePrice(selectedProducts, getPrice)
                        )}</p>
                    <div>
                        <button
                            className={`gen-button ${selectedProducts.length === 0 ? 'disb' : theme}`}
                            disabled = {selectedProducts.length === 0}
                            onClick={onConfirm}>Confirm</button>
                        <button className={`gen-button`} onClick={cancelAll}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSelector