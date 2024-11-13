import "./shop-stock.css"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ShopStockItem} from "./ShopStockItem";
const MOCK_STOCKS = [
    {
        product: {
            id: 1,
            name: 'cookie',
            price: 10,
            pictureUrl: 'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2700,h_2700,c_limit/chocolate-chip-cookie.jpg'
        },
        remaining: 2
    },
    {
        product: {
            id: 2,
            name: 'cake',
            price: 20,
            pictureUrl: 'https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-threeByTwoMediumAt2X.jpg'
        },remaining: 10
    },
    {
        product: {
            id: 3,
            name: 'tasty marshmallow colors',
            price: 30,
            pictureUrl: 'https://static.toiimg.com/thumb/52762770.cms?imgsize=65333&width=800&height=800'
        },
        remaining: 10
    },
    {
        product: {
            id: 4,
            name: 'muffins',
            price: 25,
            pictureUrl: 'https://www.allrecipes.com/thmb/RdyL1EgIB0Qq_fr5HjdsAmcpMlU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228553-moist-chocolate-muffins-DDMFS-4x3-a9f73a46938547c99d921613dc167741.jpg'
        },
        remaining: 0
    },
    {
        product: {
            id: 5,
            name: 'mint candies',
            price: 10,
            pictureUrl: 'https://5.imimg.com/data5/LL/LL/GLADMIN-/mint-candy-250x250.jpg'
        },
        remaining: 20
    },
    {
        product: {
            id: 6,
            name: 'Product with no image',
            price: 10,
            pictureUrl: null
        },
        remaining: 10
    }
]
const ShopStock = ({shopId}) => {
    const shopById = {
        id: 1,
        name: "Shop 1",
    }
    const navigate = useNavigate();
    const [products, setProducts] = useState(MOCK_STOCKS);
    const onBack = () => {
        navigate('/shops/')
    }
    const onBackShop = () => {
        navigate(`/shops/${shopId}`)
    }
    return (
        <div>
            <p className={"location-hint"}>
                <span onClick={onBack} className={"location-link"}>Shops</span>/
                <span onClick={onBackShop} className={"location-link"}>{shopById.name}</span>/Stocks
            </p>
            <h1 className={"shop-stock-title"}>{shopById.name} remaining products</h1>
            <button className={"gen-button"} onClick={onBack}>Back to shops</button>
            <div className={"shop-stock-line"} />
            <div className={"shop-stock-grid"}>
                {
                    products.map((pr) => (
                        <ShopStockItem product_remaining={pr} />
                    ))
                }
            </div>
        </div>
    )
}

export default ShopStock