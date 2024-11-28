import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import { Link } from 'react-router-dom';
import ApiService from "../api/ApiService"

const Dashboard = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // API call pour obtenir les restaurants
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        const data = await ApiService.getRestaurants()
        setRestaurants(data);
    };

    return (
        <div>
            <h1>Restaurants</h1>
            <input type="text" placeholder="Rechercher un restaurant" />
            <div className="restaurants-list">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
