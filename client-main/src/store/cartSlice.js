import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],  // Tableau pour contenir les produits du panier
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const existingProduct = state.items.find(
                (item) => item._id === action.payload._id
            );
            if (existingProduct) {
                // Si le produit existe déjà, on ajoute une quantité
                existingProduct.quantity += 1;
            } else {
                // Sinon, on ajoute le produit avec une quantité de 1
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },
        removeProductFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.items = []; // Vide le panier
        }
    }
});

// Exporte les actions pour les utiliser dans les composants
export const { addProductToCart, removeProductFromCart, clearCart } = cartSlice.actions;

// Exporte le reducer pour être utilisé dans le store
export default cartSlice.reducer;
