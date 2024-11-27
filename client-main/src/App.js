import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import AppDashboard from "./pages/Dashboard";

const App = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Vérification de la validité du token
    const isTokenExpired = () => {
        if (!token) return true; // Si le token n'existe pas, il est expiré

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const expirationDate = decodedToken.exp * 1000; // Convertir en millisecondes
            return expirationDate < Date.now(); // Comparer la date d'expiration avec la date actuelle
        } catch (error) {
            return true; // Si une erreur se produit lors de la décodification, on considère que le token est invalide
        }
    };

    // Si le token est expiré ou inexistant, rediriger vers login
    if (!token || isTokenExpired()) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return <Navigate to="/login" />;
    }
   console.log(role)
    return (
        <Routes>
            {/* Route par défaut */}
            <Route path="/" element={!token ? <Navigate to="/login" /> : <Navigate to={`/${role}/dashboard`} />} />

            {/* Routes publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Routes protégées */}
            {role === "admin" && <Route path="/admin/dashboard" element={<AdminDashboard />} />}
            {role === "restaurateur" && <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />}
            {role === "utilisateur" && <Route path="/utilisateur/dashboard" element={<AppDashboard />} />}
        </Routes>
    );
};

export default App;
