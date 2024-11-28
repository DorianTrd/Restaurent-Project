import React, { useState } from 'react';

const CartPage = () => {
    const [cart, setCart] = useState([]);  // Vous pouvez utiliser Redux ou un store pour gérer cela

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <h1>Panier</h1>
            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                cart.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                        <span>{item.price}€</span>
                    </div>
                ))
            )}
            <h2>Total : {calculateTotal()}€</h2>
            <button>Payer</button>
        </div>
    );
};

export default CartPage;
