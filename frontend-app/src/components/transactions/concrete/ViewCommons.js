import "./../transactions.css"
import {formatDate, formatPrice} from "../../../utils/date";
export function ViewCommons({item}) {
    return (
        <div>
            <p className={"trc-head"}>Products</p>
            <div>
                <div className={"trc-table"}>
                    <div className={"trc-row"}>
                        <div className={"trc-td htop"}>Product</div>
                        <div className={"trc-td htop"}>Price</div>
                        <div className={"trc-td htop"}>Amount</div>
                    </div>
                    { item.products.map((p, index)=>
                            (
                                <div className={"trc-row"} key={index}>
                                    <div className={"trc-td"}>{p.name}</div>
                                    <div className={"trc-td"}>{formatPrice(p.price)}</div>
                                    <div className={"trc-td"}>{p.amount}</div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <p> <span className={"trc-head"}>Price: </span>{formatPrice(item.price)}</p>
            <p> <span className={"trc-head"}>Date: </span>{formatDate(item.date)}</p>
            <p> <span className={"trc-head"}>Cashier: </span>{item.cashier}</p>
            <p> <span className={"trc-head"}>Shop: </span>{item.shop.name}</p>
        </div>
    )
}