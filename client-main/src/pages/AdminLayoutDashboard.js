import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?.role === 'admin') {
            navigate('/dashboard/admin');
        } else if (user?.role === 'restaurateur') {
            navigate('/dashboard/restaurateur');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Redirige vers la page de connexion après déconnexion
    };

    return (
        <div>
            <h1>{user?.role} Dashboard</h1>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
};

export default AdminDashboard;
