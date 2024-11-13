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
            <ProductImage name={product_remaining.product.name} pictureUrl={product_remaining.product.pictureUrl} size={"s-150"} />
            <h3 className={"stock-name"}>{product_remaining.product.name}</h3>
            <div className={"w-full pl-2"}>
                <p>Price: {formatPrice(product_remaining.product.price)}</p>
                <p>In Stock: {product_remaining.remaining}</p>
            </div>
        </div>
    )
}