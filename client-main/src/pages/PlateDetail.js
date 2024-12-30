import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // Importez useDispatch
import { addProductToCart } from "../store/cartSlice"; // Importez l'action
import ApiService from "../api/ApiService";

const PlateDetails = () => {
    const { restaurantId, platId } = useParams();  // Utilise platId pour correspondre à ton backend
    const [plat, setPlat] = useState(null);  // Utilise plat pour correspondre au modèle
    const dispatch = useDispatch(); // Initialisez useDispatch

    useEffect(() => {
        // Charger les détails du plat
        const fetchPlat = async () => {
            try {
                const response = await ApiService.getPlatDetails(restaurantId, platId);  // Appel API modifié
                setPlat(response);  // Utilise response qui est le plat récupéré
            } catch (error) {
                console.error('Erreur lors de la récupération du plat:', error);
            }
        };

        fetchPlat();
    }, [restaurantId, platId]);

    const addPlatToCart = () => {
        dispatch(addProductToCart(plat)); // Ajoutez le plat au panier via Redux
    };

    if (!plat) return <p>Chargement...</p>;

    return (
        <div>
            <h1>{plat.nom}</h1>  {/* Affichage du nom du plat */}
            <p>{plat.description}</p>  {/* Affichage de la description */}
            <p>{plat.prix}?</p>  {/* Affichage du prix */}
            <button onClick={addPlatToCart}>Ajouter au panier</button>  {/* Ajout au panier */}
        </div>
    );
};

export default PlateDetails;
