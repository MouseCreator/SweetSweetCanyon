import React from 'react';
import {Link, useParams} from 'react-router-dom';
import OrderSuccess from "../../components/orders/OrderSuccess";

function OrderPage() {
    const { id } = useParams();
    //MOCK: from server by id
    const myOrder = {
        id: 1234,
        total_price: 35,
        cashier: {
            id: 1,
            name: 'John'
        },
        date: new Date(),
        items: [
            {
                sold_product: {
                    id: 1,
                    name: 'muffin',
                    price: 10,
                },
                amount: 2,
            },
            {
                sold_product: {
                    id: 1,
                    name: 'ice cream',
                    price: 15,
                },
                amount: 1,
            }
        ]
    }
    return (
        <div>
            <h1>Order {id} Status</h1>
            <OrderSuccess order={myOrder} />
            <Link to={`/orders`}>All Orders</Link>
        </div>
    );
}

export default OrderPage;