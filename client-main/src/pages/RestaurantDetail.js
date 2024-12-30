import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from "../api/ApiService";

const RestaurantDetails = () => {
    const { restaurantId } = useParams();
    const [plats, setPlats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (restaurantId) {
            const fetchPlats = async () => {
                try {
                    console.log("Fetching plats for restaurant:", restaurantId);
                    const fetchedPlats = await ApiService.getPlatsByRestaurant(restaurantId);
                    setPlats(fetchedPlats);
                } catch (err) {
                    console.error("Erreur lors de la récupération des plats:", err);
                    setError("Impossible de charger les plats pour ce restaurant.");
                } finally {
                    setLoading(false);
                }
            };

            fetchPlats();
        }
    }, [restaurantId]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Plats du restaurant {restaurantId}</h1>
            {plats.length === 0 ? (
                <p>Aucun plat disponible.</p>
            ) : (
                <ul>
                    {plats.map((plat) => (
                        <li key={plat.id}>{plat.nom} - {plat.prix}€</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RestaurantDetails;
