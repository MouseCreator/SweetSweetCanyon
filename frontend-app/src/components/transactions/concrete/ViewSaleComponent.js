import {useState} from "react";
import "../transactions.css"
import {ViewCommons} from "./ViewCommons";
import {useNavigate} from "react-router-dom";
const MOCK_SALE = {
    id: 1,
        type: 'sale',
        date: new Date(),
        products: [ {id: 1, name: 'A', amount: 2, price: 20} ],
        price: 11,
        shop: {
        id: 1,
            name: 'Shop'
    },
    cashier: 'Mouse'
};

export function ViewSaleComponent({itemId}) {
    const [item, setItem] = useState(MOCK_SALE)
    const navigate = useNavigate();
    const toTransactions = () => {
        navigate("/transactions");
    }
    return (
        <div className={"trc-page"}>
            <div className={"trc-wrapper"}>
                <p className={"location-hint"}>
                    <span className={"location-link"} onClick={toTransactions}>Transactions</span>/
                    <span>Sales</span>/
                    <span>{item.id}</span>
                </p>
                <h2 className={"trc-title"}>Sale №{item.id}</h2>
                <ViewCommons item={item} />
                <div className={"trc-back-wrapper"}>
                    <button className={"gen-button trc-back"} onClick={toTransactions}>Back</button>
                </div>
            </div>
        </div>
    )
}