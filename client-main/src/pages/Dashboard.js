import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ApiService from '../api/ApiService';
import RestaurantCard from '../components/RestaurantCard';
import { logout } from '../store/authSlice';

function Dashboard() {
    const [restaurants, setRestaurants] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getRestaurants().then(setRestaurants);
    }, []);

    const handleLogout = () => {
        dispatch(logout()); // Action pour réinitialiser l'état d'authentification
        navigate('/login'); // Redirection vers la page de connexion
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Restaurants</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Se déconnecter
                </button>
            </header>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
