import React from 'react';
import {Link, useParams} from 'react-router-dom';

function CashierHome() {

    const { id } = useParams();
    const data= {
        id: id,
        name: 'John',
        phone: '+38 (222) 22 22',
        email: 'john@gmail.com'
    }
    return (
        <div>
            <div>
                <h1>Cashier's Profile</h1>
                <p>Name: {data.name}</p>
                <p>Phone: {data.phone}</p>
                <p>Email: {data.email}</p>
            </div>
            <div>
                <Link to={`/cashiers/${id}/edit`}>Edit</Link>
            </div>
        </div>
    );
}

export default CashierHome;