import React, { useState, useEffect } from "react";
import ApiService from "../api/ApiService";
import "../style.css"; // Importer le fichier CSS

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {
        try {
            const userOrders = await ApiService.getLoggedUserOrders();
            setOrders(userOrders);
        } catch (error) {
            console.error("Erreur lors du chargement des commandes :", error);
        }
    };

    const getOrderTotal = (order) => {
        return order?.items?.reduce((total, item) => item?.price + total, 0);
    };

    const getOrderFormattedDate = (order) => {
        const date = new Date(order?.createdAt);
        return `Commande du ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <div className="app-orders">
            {orders.map((order, index) => (
                <div key={index} className="order">
                    <div className="order-date">{getOrderFormattedDate(order)}</div>
                    <div className="order-price">{getOrderTotal(order)}€</div>
                </div>
            ))}
        </div>
    );
};

export default Orders;
