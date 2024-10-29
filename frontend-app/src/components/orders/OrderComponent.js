import formatDate from "../../utils/date";


function OrderComponent(order) {
    return (
        <div style={{border: 2}}>
            <h1>Order {order.id}</h1>
            <div>{formatDate(order.date)}</div>
            <div>Total: {formatDate(order.total_price)}</div>
        </div>
    )
}

export default OrderComponent