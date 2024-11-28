import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Redirige vers la page de connexion apr�s la d�connexion
    };

    return (
        <div>
            <h1>{user?.role} Dashboard</h1>
            <button onClick={handleLogout}>Se d�connecter</button>
        </div>
    );
};

export default AdminDashboard;
