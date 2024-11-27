import React, { createContext, useState } from 'react';

// Crée un contexte pour gérer le panier
export const CartContext = createContext();

// Fournisseur pour englober toute l'application
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Fonction pour ajouter un plat au panier
    const addToCart = (item) => {
        setCart((prev) => [...prev, item]);
    };

    // Fonction pour retirer un plat du panier
    const removeFromCart = (index) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    // Fonction pour calculer le total du panier
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    // Expose les méthodes et le state
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
}
