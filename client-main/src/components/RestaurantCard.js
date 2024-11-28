import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="restaurant-card">
            <Link to={`/dashboard/restaurants/${restaurant.id}/plates`}>
                <img src={restaurant.image} alt={restaurant.name} />
                <h3>{restaurant.name}</h3>
            </Link>
        </div>
    );
};

export default RestaurantCard;
