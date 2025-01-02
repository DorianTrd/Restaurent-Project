import AxiosInstance from './AxiosInstance';

const ApiService = {
    // Restaurants
    getRestaurants: () =>
        AxiosInstance.get('/restaurants').then((res) => res.data), // R�cup�rer tous les restaurants

    getRestaurantById: (id) =>
        AxiosInstance.get(`/restaurant/${id}`).then((res) => res.data), // R�cup�rer un restaurant par ID

    getRestaurantByUserId: (userId) => {
        return AxiosInstance.get(`/restaurant/user/${userId}`).then((res) => res.data);
    },

    createRestaurant: (data) =>
        AxiosInstance.post('/restaurants', data).then((res) => res.data), // Cr�er un restaurant

    updateRestaurant: (id, data) =>
        AxiosInstance.put(`/restaurant/${id}`, data).then((res) => res.data), // Mettre � jour un restaurant

    deleteRestaurant: (id) =>
        AxiosInstance.delete(`/restaurant/${id}`).then((res) => res.data), // Supprimer un restaurant

    // Plats
    getPlatsByRestaurant: (restaurantId) =>
        AxiosInstance.get(`/restaurants/${restaurantId}/dishes`).then((res) => res.data),


    getPlatById: (restaurantId, dishId) =>
        AxiosInstance.get(`/restaurant/${restaurantId}/dish/${dishId}`).then((res) => res.data), // R�cup�rer un plat sp�cifique d'un restaurant

    createPlat: (restaurantId, data) =>
        AxiosInstance.post(`/restaurant/${restaurantId}/dish`, data).then((res) => res.data), // Cr�er un plat pour un restaurant

    updatePlat: (restaurantId, dishId, data) =>
        AxiosInstance.put(`/restaurant/${restaurantId}/dish/${dishId}`, data).then((res) => res.data), // Mettre � jour un plat sp�cifique d'un restaurant

    deletePlat: (restaurantId, dishId) =>
        AxiosInstance.delete(`/restaurant/${restaurantId}/dish/${dishId}`).then((res) => res.data), // Supprimer un plat sp�cifique d'un restaurant

    // Commandes
    getCommandes: () =>
        AxiosInstance.get('/orders').then((res) => res.data), // R�cup�rer toutes les commandes

    getCommandeById: (id) =>
        AxiosInstance.get(`/order/${id}`).then((res) => res.data), // R�cup�rer une commande par ID

    createCommande: (data) =>
        AxiosInstance.post('/orders', data).then((res) => res.data), // Cr�er une commande

    updateCommande: (id, data) =>
        AxiosInstance.put(`/order/${id}`, data).then((res) => res.data), // Mettre � jour une commande

    deleteCommande: (id) =>
        AxiosInstance.delete(`/order/${id}`).then((res) => res.data), // Supprimer une commande
};

export default ApiService;
