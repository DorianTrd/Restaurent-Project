import AxiosInstance from './AxiosInstance';

const ApiService = {
    // Restaurants
    getRestaurants: () =>
        AxiosInstance.get('/restaurants').then((res) => res.data), // Récupérer tous les restaurants

    getRestaurantById: (id) =>
        AxiosInstance.get(`/restaurant/${id}`).then((res) => res.data), // Récupérer un restaurant par ID

    createRestaurant: (data) =>
        AxiosInstance.post('/restaurants', data).then((res) => res.data), // Créer un restaurant

    updateRestaurant: (id, data) =>
        AxiosInstance.put(`/restaurant/${id}`, data).then((res) => res.data), // Mettre à jour un restaurant

    deleteRestaurant: (id) =>
        AxiosInstance.delete(`/restaurant/${id}`).then((res) => res.data), // Supprimer un restaurant

    // Plats
    getPlatsByRestaurant: (restaurantId) =>
        AxiosInstance.get(`/restaurant/${restaurantId}/dish`).then((res) => res.data), // Récupérer tous les plats d'un restaurant

    getPlatById: (restaurantId, dishId) =>
        AxiosInstance.get(`/restaurant/${restaurantId}/dish/${dishId}`).then((res) => res.data), // Récupérer un plat spécifique d'un restaurant

    createPlat: (restaurantId, data) =>
        AxiosInstance.post(`/restaurant/${restaurantId}/dish`, data).then((res) => res.data), // Créer un plat pour un restaurant

    updatePlat: (restaurantId, dishId, data) =>
        AxiosInstance.put(`/restaurant/${restaurantId}/dish/${dishId}`, data).then((res) => res.data), // Mettre à jour un plat spécifique d'un restaurant

    deletePlat: (restaurantId, dishId) =>
        AxiosInstance.delete(`/restaurant/${restaurantId}/dish/${dishId}`).then((res) => res.data), // Supprimer un plat spécifique d'un restaurant

    // Commandes
    getCommandes: () =>
        AxiosInstance.get('/orders').then((res) => res.data), // Récupérer toutes les commandes

    getCommandeById: (id) =>
        AxiosInstance.get(`/order/${id}`).then((res) => res.data), // Récupérer une commande par ID

    createCommande: (data) =>
        AxiosInstance.post('/orders', data).then((res) => res.data), // Créer une commande

    updateCommande: (id, data) =>
        AxiosInstance.put(`/order/${id}`, data).then((res) => res.data), // Mettre à jour une commande

    deleteCommande: (id) =>
        AxiosInstance.delete(`/order/${id}`).then((res) => res.data), // Supprimer une commande
};

export default ApiService;
