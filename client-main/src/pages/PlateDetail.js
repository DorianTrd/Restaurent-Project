import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../store/cartSlice";
import ApiService from "../api/ApiService";

const PlateDetails = () => {
    const { restaurantId, plateId } = useParams();
    const [plate, setPlate] = useState(null);
    const cartStore = useCartStore(); // Simuler un store si nécessaire

    useEffect(() => {
        // Charger les détails du plat
        const fetchPlate = async () => {
            const fetchedPlate = await ApiService.getPlate(restaurantId, plateId);
            setPlate(fetchedPlate);
        };

        fetchPlate();
    }, [restaurantId, plateId]);

    const addPlateToCart = () => {
        cartStore.addProductToCart(plate); // Ajout au panier (adapter selon votre logique)
    };

    if (!plate) return <p>Chargement...</p>;

    return (
        <div>
            <h1>{plate.name}</h1>
            <img src={plate.image} alt={plate.name} />
            <p>{plate.description}</p>
            <p>{plate.price}€</p>
            <button onClick={addPlateToCart}>Ajouter au panier</button>
        </div>
    );
};

export default PlateDetails;
