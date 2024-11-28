import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlateCard from "../components/PlateCard";
import ApiService from "../api/ApiService";

const RestaurantDetails = () => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [plates, setPlates] = useState([]);

    useEffect(() => {
        // Charger les données du restaurant et ses plats
        const fetchData = async () => {
            const fetchedRestaurant = await ApiService.getRestaurant(restaurantId);
            const fetchedPlates = await ApiService.getRestaurantsPlates(restaurantId);
            setRestaurant(fetchedRestaurant);
            setPlates(fetchedPlates);
        };

        fetchData();
    }, [restaurantId]);

    if (!restaurant) return <p>Chargement...</p>;

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>

            <div className="plates-list">
                {plates.map((plate) => (
                    <PlateCard key={plate._id} plate={plate} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantDetails;
