import "./salecheck.css"
import {formatPrice} from "../../../utils/date";
import {calculatePrice} from "../Price";

export function SaleCheque({selectedProducts}) {
    return (
        <div>
            <div>
                {
                    selectedProducts.map((sp) =>
                        (<div className={"flex justify-between"}>
                            <div>{sp.product.name}</div>
                            <div>{sp.product.price}</div>
                            <div>{sp.amount}</div>
                        </div>)
                    )
                }
            </div>
            <p>Total: {formatPrice(calculatePrice(selectedProducts))}</p>
        </div>
    )
}