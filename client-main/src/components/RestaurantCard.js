import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            <h2>{restaurant.name}</h2>
            <img src={restaurant.image} alt={restaurant.name} />
            <Link to={`/restaurant/${restaurant.id}`}>Voir les détails</Link>
        </div>
    );
}

export default RestaurantCard;
