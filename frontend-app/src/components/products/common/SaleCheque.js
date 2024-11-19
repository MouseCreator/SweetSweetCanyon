import "./salecheck.css"
import {formatPrice} from "../../../utils/date";
import {calculatePrice} from "../Price";

export function SaleCheque({selectedProducts, isDelivery}) {
    const getPrice = (pr) => {
        return isDelivery ? pr.deliveryPrice : pr.price
    }
    const price = calculatePrice(selectedProducts, getPrice);

    return (
        <div className={"flex flex-col items-start"}>
            <div className={"cheque-table"}>
                {
                selectedProducts.map((sp) =>
                    (
                    <div className={"cheque-container"}>
                        <div>{sp.product.name}</div>
                        <div>{formatPrice(sp.product.price)}</div>
                        <div>{sp.amount}</div>
                    </div>
                    )
                )
                }
            </div>
            <div className={"cheque-sep"}></div>
            <p className={"font-bold"}>Total: {formatPrice(price)}</p>
        </div>
    )
}