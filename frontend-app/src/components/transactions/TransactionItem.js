import "./transactions.css"
import {useNavigate} from "react-router-dom";
import {formatDate, formatPrice} from "../../utils/date";
export function TransactionItem({itemData}) {
    const navigate = useNavigate()
    const id = itemData.id;
    const date = itemData.date
    const type = itemData.type
    const price = itemData.price
    const shop = itemData.shop.name
    const handleClick = () => {
        let navigateTo = "/transactions/unknown";
        switch(type) {
            case "sale":
                navigateTo = `/transactions/sales/${id}`;
                break;
            case "loss":
                navigateTo = `/transactions/losses/${id}`;
                break;
            case "supply":
                navigateTo = `/transactions/supplies/${id}`
                break;
            case "move":
                navigateTo = `/transactions/moves/${id}`
                break;
            default:
                break;
        }
        navigate(navigateTo)
    }

    const title =
        type === "sale" ? `Sale №${id}` :
        type === "loss" ? `Loss №${id}` :
        type === "supply" ? `Supply №${id}` :
        `Transaction ${type} ${id}`
    return (
        <div className={"transaction-item-wrap"} onClick={handleClick}>
            <div className={"tr-inner"}>
                <div className={"tr-title"}>{title}</div>
                <div>Date: {formatDate(date)}</div>
                <div>Price: {formatPrice(price)}</div>
                <div>Shop: {shop}</div>
            </div>
        </div>
    )
}