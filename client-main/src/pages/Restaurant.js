import React, { useState, useEffect } from "react";
import ApiService from "../api/ApiService";
import { useParams } from "react-router-dom";
import "./style.css";


const Restaurant = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [plates, setPlates] = useState([]);
    const [plateSearchQuery, setPlateSearchQuery] = useState("");
    const { restaurant_id } = useParams();

    const loadRestaurant = async () => {
        try {
            const fetchedRestaurant = await ApiService.getRestaurant(restaurant_id);
            setRestaurant(fetchedRestaurant);
        } catch (error) {
            console.error("Erreur lors du chargement du restaurant :", error);
        }
    };

    const loadRestaurantPlates = async () => {
        try {
            const fetchedPlates = await ApiService.getRestaurantsPlates(restaurant_id);
            setPlates(fetchedPlates);
        } catch (error) {
            console.error("Erreur lors du chargement des plats :", error);
        }
    };

    useEffect(() => {
        loadRestaurant();
        loadRestaurantPlates();
    }, [restaurant_id]);

    return (
        <div className="restaurant">
            <h1 className="page-title">{restaurant?.name}</h1>
            <input
                type="text"
                value={plateSearchQuery}
                onChange={(e) => setPlateSearchQuery(e.target.value)}
                placeholder="Rechercher un plat"
            />
            <div className="plates">
                {plates.map((plate) => (
                    <div key={plate._id}>
                        <img src={plate.image} alt={plate.name} />
                        <h2>{plate.name}</h2>
                        <p>{plate.price}€</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Restaurant;
