import {useState} from "react";
import "../transactions.css"
import {ViewCommons} from "./ViewCommons";
import {useNavigate} from "react-router-dom";
const MOCK_SUPPLY = {
    id: 2,
        type: 'supply',
        date: new Date(),
        products: [ {id: 1, name: 'A', amount: 2, price: 20}, {id: 2, name: 'Cookie', amount: 5, price: 20} ],
        price: 44,
        shop: {
        id: 1,
            name: 'Shop'
    },
    cashier: 'Mouse',
    supplier: {
        id: 1,
        title: 'Factory 1',
    },
    supplierName: 'George',
 }

export function ViewSupplyComponent({itemId}) {
    const [item, setItem] = useState(MOCK_SUPPLY)
    const navigate = useNavigate();
    const toTransactions = () => {
        navigate("/transactions");
    }
    return (
        <div className={"trc-page"}>
            <div className={"trc-wrapper"}>
                <p className={"location-hint"}>
                    <span className={"location-link"} onClick={toTransactions}>Transactions</span>/
                    <span>Supplies</span>/
                    <span>{item.id}</span>
                </p>
                <h2 className={"trc-title"}>Supply №{item.id}</h2>
                <ViewCommons item={item} />
                <p> <span className={"trc-head"}>Supplier: </span>{item.supplier.title}</p>
                <p> <span className={"trc-head"}>Supplier name: </span>{item.supplierName}</p>
                <div className={"trc-back-wrapper"}>
                    <button className={"gen-button trc-back"} onClick={toTransactions}>Back</button>
                </div>
            </div>
        </div>
    )
}