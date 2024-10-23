// src/pages/Orders.js
import React from 'react';
import { Link } from 'react-router-dom';

function Orders() {
    const orders = [
        { id: 1, name: 'Order One' },
        { id: 2, name: 'Order Two' },
        // Add more orders as needed
    ];

    return (
        <div>
            <h1>Orders</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <Link to={`/orders/${order.id}`}>{order.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Orders;