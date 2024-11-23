import "./shop-stock.css"
import {ProductImage} from "../../products/ProductImage";
import {formatPrice} from "../../../utils/date";

export const ShopStockItem = ({product_remaining}) => {
    const prod = product_remaining.product;
    const remain = product_remaining.remaining;
    const isLow = remain < 10 && remain > 0
    const isNone = remain <= 0
    const color = isLow ? 'yellow' : isNone ? 'red' : 'white'
    return (
        <div className={`stock-item ${color}`}>
            <ProductImage name={prod.name} pictureUrl={prod.pictureUrl} size={"s-150"} />
            <h3 className={"stock-name"}>{prod.name}</h3>
            <div className={"w-full pl-2"}>
                <p>Price: {formatPrice(prod.price)}</p>
                <p>In Stock: {product_remaining.remaining}</p>
            </div>
        </div>
    )
}