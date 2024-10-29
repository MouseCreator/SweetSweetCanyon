import {formatDate} from "../../utils/date";


function OrderSuccess({order}) {

    return (
        <div>
            <h1>Order №{order.id}</h1>
            {
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Sum</th>
                    </tr>
                    {order.items.map((item) =>
                    (

                        <tr>
                            <td>{item.sold_product.name}</td>
                            <td>{item.amount} </td>
                            <td>{item.sold_product.price}</td>
                            <td>{item.sold_product.price * item.amount}</td>
                        </tr>
                    )
                )}
                </table>
            }
            <p></p>
            <p>Total: {order.total_price}</p>
            <p></p>
            <p>Cashier: {order.cashier.name}</p>
            <p>Date: {formatDate(order.date)}</p>
        </div>
    )
}

export default OrderSuccess