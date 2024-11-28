import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart, removeProductFromCart, clearCart } from '../store/cartSlice';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);  // Sélectionne les items du panier depuis le store
    const dispatch = useDispatch();

    // Calculer le total du panier
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Fonction pour ajouter un produit au panier
    const handleAddToCart = (item) => {
        dispatch(addProductToCart(item));
    };

    // Fonction pour supprimer un produit du panier
    const handleRemoveFromCart = (item) => {
        dispatch(removeProductFromCart(item));
    };

    // Fonction pour vider le panier
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h2>{item.name}</h2>
                                <p>{item.price}€</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <h3>Total: {calculateTotal()}€</h3>
                        <button onClick={handleClearCart}>Clear Cart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
