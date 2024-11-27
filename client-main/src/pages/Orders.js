import React, { useEffect, useState } from 'react';
import ApiService from '../api/ApiService';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        ApiService.getOrders().then(setOrders);
    }, []);

    return (
        <div>
            <h1>Commandes</h1>
            {orders.length === 0 ? (
                <p>Vous n'avez pas encore passé de commandes.</p>
            ) : (
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            Commande du {new Date(order.date).toLocaleDateString()} - Total: {order.total} €
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Orders;
