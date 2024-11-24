import {useEffect, useState} from "react";
import "../transactions.css"
import {ViewCommons} from "./ViewCommons";
import {useNavigate} from "react-router-dom";
import {GlobalLoading} from "../../common/loading/GlobalLoading";
import {GlobalError} from "../../common/errors/GlobalError";
import {getLossById} from "../../../connect/connectTransactions";


export function ViewLossComponent({itemId}) {
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    useEffect(()=> {
        getLossById(itemId).then((t)=>{
            if (t.success) {
                setItem(t.data)
            } else {
                setError(t.error)
            }
            setLoading(false)
            }
        ).catch(()=>setError('Connection error'))
    }, [itemId])
    const toTransactions = () => {
        navigate("/transactions");
    }
    if (loading) {
        return <GlobalLoading />
    }
    if (error) {
        return <GlobalError text={error} />
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