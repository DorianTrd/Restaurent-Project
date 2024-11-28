import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login'; // Assure-toi que les pages existent
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import { getUser } from './store/features/auth/authActions'; // Importer les actions
import AdminDashboard from './pages/AdminDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';


const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, role, token } = useSelector((state) => state.auth);

    // Récupérer l'utilisateur à chaque ouverture de l'app si l'utilisateur est connecté
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUser());
        }
    }, [isAuthenticated, dispatch]);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to={`/${role}/dashboard`} />}
                />
                <Route
                    path="/register"
                    element={!isAuthenticated ? <Register /> : <Navigate to={`/${role}/dashboard`} />}
                />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                {/* Pour les routes spécifiques aux rôles */}
                <Route
                    path="/admin/dashboard"
                    element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/restaurateur/dashboard"
                    element={role === 'restaurateur' ? <RestaurantDashboard /> : <Navigate to="/login" />}
                />
                {/* Route par défaut */}
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
