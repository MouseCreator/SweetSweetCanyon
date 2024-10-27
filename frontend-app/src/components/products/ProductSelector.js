import {useState} from "react";
import ProductComponent from "./ProductComponent";
import SelectedProduct from "./SelectedProduct";
import './product.css'

const MOCK_PRODUCTS = [ // get products from server
    {
        id: 1,
        name: 'cookie',
        pictureUrl: 'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2700,h_2700,c_limit/chocolate-chip-cookie.jpg'
    },
    {
        id: 2,
        name: 'cake',
        pictureUrl: 'https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-threeByTwoMediumAt2X.jpg'
    },
    {
        id: 3,
        name: 'marshmallow',
        pictureUrl: 'https://static.toiimg.com/thumb/52762770.cms?imgsize=65333&width=800&height=800'
    },
    {
        id: 4,
        name: 'muffins',
        pictureUrl: 'https://www.allrecipes.com/thmb/RdyL1EgIB0Qq_fr5HjdsAmcpMlU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228553-moist-chocolate-muffins-DDMFS-4x3-a9f73a46938547c99d921613dc167741.jpg'
    },
    {
        id: 5,
        name: 'mint candies',
        pictureUrl: 'https://5.imimg.com/data5/LL/LL/GLADMIN-/mint-candy-250x250.jpg'

    }
]

function ProductSelector() {
    const [selectedProducts, setSelectedProducts] = useState([])
    const [searchPrompt, setSearchPrompt] = useState('')

    const [products, setProducts] = useState(MOCK_PRODUCTS.map(
        (p)=>({product: p, checked: false})));
    const onAddProduct = (product) => {
        if (!product) {
            return
        }
        const existing = selectedProducts.find((s) => s.id === product.id);
       if (existing) {
            existing.amount = 1;
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
        console.log(newProducts)
        setProducts(newProducts);
    }
    const onChangeAmount = (id, amount) => {
        const product = selectedProducts.find((s) => s.id === id);
        if (product) {
            product.amount = amount;
        }
    }
    const onSearch = () => {
        const prompt = searchPrompt.trim().toLowerCase()
        setProducts(MOCK_PRODUCTS.filter(pr => pr.name.toLowerCase().indexOf(prompt) > -1)
            .map(
                (p)=>(
                    {
                        product: p,
                        checked: selectedProducts.find((p2)=>(p2.product.id===p.id)) !== null
                    }
                    )
            )
        )
    }
    const onTextChange = (e) => {
        const val = e.target.value
        setSearchPrompt(val)
    }
    return (
        <div>
            <div>
                <input
                    type="text"
                    value={searchPrompt}
                    placeholder="Product name"
                    onChange={onTextChange}
                />
                <button onClick={onSearch}>Search</button>
            </div>
            <div className="product-grid">
                {products.map((ch_p, index) => (
                    <ProductComponent product={ch_p.product}
                                      is_added={ch_p.checked}
                                      onAdd={onAddProduct}
                                      onCancel={onCancelProduct}  />
                ))}
            </div>
            <div>
                <p>Selected items</p>
                <div>
                    {
                        selectedProducts.map((selected, index) => (
                            <SelectedProduct product={selected.product} initAmount = {selected.amount} onAmountChange={onChangeAmount} onCancel={onCancelProduct}/>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductSelector