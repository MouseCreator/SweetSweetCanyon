import "./shop-stock.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ShopStockItem} from "./ShopStockItem";
import {GlobalLoading} from "../../common/loading/GlobalLoading";
import {GlobalError} from "../../common/errors/GlobalError";
import {getStocksByShopId} from "../../../connect/connectStocks";
import {getShopById} from "../../../connect/connectShops";

const ShopStock = ({shopId}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shopById, setShopById] = useState(null)
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const onBack = () => {
        navigate('/shops/')
    }

    useEffect(()=>{
        getStocksByShopId(shopId)
            .then((stocks)=>{
                if (stocks.success) {
                    setProducts(stocks.data)
                } else {
                    setError(stocks.error)
                }
                setIsLoading(false)
            }).catch(()=>setError('Connection error'))
        getShopById(shopId).then((s) => {
            if (s.success) {
                const t = s.data
                setShopById(t)
            } else {
                if (error == null) {
                    setError(s.error)
                }
            }
        }).catch(()=>setError('Connection error'))

    }, shopId)
    const onBackShop = () => {
        navigate(`/shops/${shopId}`)
    }
    if (isLoading) {
        return <GlobalLoading />
    }
    if (error != null) {
        return <GlobalError />
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