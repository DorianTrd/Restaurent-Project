import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../api/ApiService';
import { CartContext } from '../context/CartContext'; // Import du contexte

function PlateDetail() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext); // Utilisation du contexte
    const [plate, setPlate] = useState(null);

    useEffect(() => {
        ApiService.getPlateById(id).then(setPlate);
    }, [id]);

    if (!plate) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>{plate.name}</h1>
            <img src={plate.image} alt={plate.name} />
            <p>{plate.description}</p>
            <p>Prix: {plate.price} €</p>
            <button onClick={() => addToCart(plate)}>Ajouter au panier</button>
        </div>
    );
}

export default PlateDetail;
