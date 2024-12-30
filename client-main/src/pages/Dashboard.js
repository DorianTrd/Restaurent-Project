import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../api/ApiService';

const Dashboard = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await ApiService.getRestaurants();
                setRestaurants(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des restaurants:", error);
            }
        };
        fetchRestaurants();
    }, []);

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.adresse.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Restaurants</h1>
            <input
                type="text"
                placeholder="Rechercher un restaurant"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="restaurants-list">
                {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="restaurant-card">
                        <h2>{restaurant.nom}</h2>
                        <p>{restaurant.adresse}</p>
                        <Link
                            to={`restaurants/${restaurant.id}/dishes`}
                            onClick={() => console.log(`Navigating to: restaurants/${restaurant.id}/dishes`)}
                        >Voir plus</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
