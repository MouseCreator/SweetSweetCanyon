import React from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
    const { id } = useParams();

    return (
        <div>
            <h1>Order Details for Order ID: {id}</h1>
        </div>
    );
}

export default OrderDetails;