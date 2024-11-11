import {ProductImage} from "./ProductImage";
import {formatPrice} from "../../utils/date";
import "./product.css"
import './../../index.css'

function ProductSimple({ product }) {
    const name = product.name
    const pictureUrl = product.pictureUrl
    const price = product.price
    return (
        <div className={"product-component"}>
            <div className={"flex flex-row"}>
                <div className={"w-1/2"}>
                    <ProductImage pictureUrl={pictureUrl} name={name} size={"s-150"} />
                </div>
                <div className={"w-1/2 pt-2"}>
                    <div className={"flex h-full flex-col justify-between"}>
                        <div>
                            <p className={"product-component-title"}>{name}</p>
                            <p className={"short-line"}>Price: {formatPrice(price)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSimple