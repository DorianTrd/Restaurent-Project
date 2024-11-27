import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../store/cartSlice';

function Cart() {
    const { cart, removeFromCart, calculateTotal } = useContext(CartContext);

    return (
        <div>
            <h1>Panier</h1>
            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <div>
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <h3>{item.name}</h3>
                            <p>Prix: {item.price} €</p>
                            <button onClick={() => removeFromCart(index)}>Retirer</button>
                        </div>
                    ))}
                    <h2>Total: {calculateTotal()} €</h2>
                    <button>Valider la commande</button>
                </div>
            )}
        </div>
    );
}

export default Cart;
