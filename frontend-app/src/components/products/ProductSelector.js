import {useState} from "react";
import ProductComponent from "./ProductComponent";
import SelectedProduct from "./SelectedProduct";
import './product.css'
import './../../index.css'
import './../../static_controls/inputs.css'
import {formatPrice} from "../../utils/date";
import selectedProduct from "./SelectedProduct";
const MOCK_PRODUCTS = [ //MOCK: from server
    {
        id: 1,
        name: 'cookie',
        price: 10,
        pictureUrl: 'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2700,h_2700,c_limit/chocolate-chip-cookie.jpg'
    },
    {
        id: 2,
        name: 'cake',
        price: 20,
        pictureUrl: 'https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-threeByTwoMediumAt2X.jpg'
    },
    {
        id: 3,
        name: 'tasty marshmallow colors',
        price: 30,
        pictureUrl: 'https://static.toiimg.com/thumb/52762770.cms?imgsize=65333&width=800&height=800'
    },
    {
        id: 4,
        name: 'muffins',
        price: 25,
        pictureUrl: 'https://www.allrecipes.com/thmb/RdyL1EgIB0Qq_fr5HjdsAmcpMlU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228553-moist-chocolate-muffins-DDMFS-4x3-a9f73a46938547c99d921613dc167741.jpg'
    },
    {
        id: 5,
        name: 'mint candies',
        price: 10,
        pictureUrl: 'https://5.imimg.com/data5/LL/LL/GLADMIN-/mint-candy-250x250.jpg'

    },

    {
        id: 6,
        name: 'Product with no image',
        price: 10,
        pictureUrl: null

    }
]

function ProductSelector({confirmAction, theme, mode}) {
    const [selectedProducts, setSelectedProducts] = useState([])
    const [searchPrompt, setSearchPrompt] = useState('')

    const [products, setProducts] = useState(MOCK_PRODUCTS.map(
        (p)=>({ product: p, checked: false})));
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
        console.log(newProducts);
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
        console.log(newProducts)
    }

    const cancelAll = () => {
        setProducts(MOCK_PRODUCTS.map(
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
        setProducts(MOCK_PRODUCTS.filter(pr => pr.name.toLowerCase().indexOf(prompt) > -1)
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

    const titleText = mode === "sale" ? "Sale products" : "Product selector"

    return (
        <div>
            <div className={"flex flex-row w-1/2 products-upper"}>
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
            <div className={"flex flex-row"}>
                <div className={"product-grid-wrapper"}>
                    <div className="product-grid">
                        {products.map((ch_p) => (
                            <ProductComponent product={ch_p.product}
                                              is_added={ch_p.checked}
                                              onAdd={onAddProduct}
                                              onCancel={onCancelProduct}
                                              theme={theme}  />
                        ))}
                    </div>
                </div>
                <div className={"w-1/2"}>
                    <div className={"right-pane-wrapper"}>
                        <p className={`selected-items-text themed-text ${theme}`}>Selected items</p>
                        <div className={"selected-items-wrapper"}>
                            {
                                selectedProducts.map((selected, index) => (
                                    <SelectedProduct product={selected.product} initAmount = {selected.amount} onAmountChange={onChangeAmount} onCancel={onCancelProduct}/>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <p className={"mx-2 selected-on-text"}>Total: {
                        formatPrice(
                        selectedProducts.reduce(
                        (accumulator, currentValue) => accumulator + currentValue.product.price * currentValue.amount,
                        0)
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