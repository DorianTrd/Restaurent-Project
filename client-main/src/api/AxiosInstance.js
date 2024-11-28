import axios from 'axios';
import store from '../store'; // Correctement pointé vers le store
import { logout } from '../store/authSlice';

// Crée une instance d'axios avec une URL de base
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Remplace par l'URL de ton API
});

// Ajouter le token dans les headers de la requête sans utiliser "Bearer"
axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('accessToken'); // Récupère le token stocké dans localStorage
    if (token) {
        // Ajoute le token dans les headers sous le nom "x-access-token"
        config.headers['x-access-token'] = token;
    }
    return config;
});

// Gestion des réponses et erreurs
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            // Si l'utilisateur n'est pas authentifié, on effectue un logout
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
