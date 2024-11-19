import {useState} from "react";
import "../transactions.css"
import {ViewCommons} from "./ViewCommons";
import {useNavigate} from "react-router-dom";
const MOCK_LOSS = {
    id: 3,
    type: 'loss',
    date: new Date(),
    products: [ {id: 1, name: 'Tasty cookies in colors rgb', amount: 2, price: 20}, {id: 2, name: 'Other', amount: 5, price: 20} ],
    price: 55,
    shop: {
        id: 1,
        name: 'Shop'
    },
    cashier: 'Mouse',
    reason: {
        id: 1,
        title: 'Other'
    },
    comment: 'Lost'
};

export function ViewLossComponent({itemId}) {
    const [item, setItem] = useState(MOCK_LOSS)
    const navigate = useNavigate();
    const toTransactions = () => {
        navigate("/transactions");
    }
    return (
        <div className={"trc-page"}>
            <div className={"trc-wrapper"}>
                <p className={"location-hint"}>
                    <span className={"location-link"} onClick={toTransactions}>Transactions</span>/
                    <span>Losses</span>/
                    <span>{item.id}</span>
                </p>
                <h2 className={"trc-title"}>Loss №{item.id}</h2>
                <ViewCommons item={item} />
                <p> <span className={"trc-head"}>Reason: </span>{item.reason.title}</p>
                <p> <span className={"trc-head"}>Comment: </span>{item.comment}</p>
                <div className={"trc-back-wrapper"}>
                    <button className={"gen-button trc-back"} onClick={toTransactions}>Back</button>
                </div>
            </div>
        </div>
    )
}