import React, { useState, useEffect } from 'react';
import ApiService from '../api/ApiService';
import RestaurantCard from '../components/RestaurantCard';

function Dashboard() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        ApiService.getRestaurants().then(setRestaurants);
    }, []);

    return (
        <div>
            <h1>Restaurants</h1>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
