import axios from 'axios';
import store from '../store'; // Correctement point� vers le store
import { logout } from '../store/authSlice';

// Cr�e une instance d'axios avec une URL de base
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Remplace par l'URL de ton API
});

// Ajouter le token dans les headers de la requ�te sans utiliser "Bearer"
axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('accessToken'); // R�cup�re le token stock� dans localStorage
    if (token) {
        // Ajoute le token dans les headers sous le nom "x-access-token"
        config.headers['x-access-token'] = token;
    }
    return config;
});

// Gestion des r�ponses et erreurs
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            // Si l'utilisateur n'est pas authentifi�, on effectue un logout
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
