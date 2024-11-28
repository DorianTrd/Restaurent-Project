import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const RestaurantDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Redirige vers la page de connexion apr�s la d�connexion
    };

    return (
        <div>
            <h1>Restaurant Dashboard</h1>
            <button onClick={handleLogout}>Se d�connecter</button>
        </div>
    );
};

export default RestaurantDashboard;
