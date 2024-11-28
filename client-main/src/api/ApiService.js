import AxiosInstance from './AxiosInstance';

const ApiService = {
    // Authentification
   
    // Utilisateur
    getUser: () =>
        AxiosInstance.get('/user').then((res) => res.data), // Récupérer les infos de l'utilisateur connecté

    updateUser: (data) =>
        AxiosInstance.put('/user', data).then((res) => res.data), // Mettre à jour les infos utilisateur

    getUsers: () =>
        AxiosInstance.get('/users').then((res) => res.data), // Récupérer tous les utilisateurs (admin seulement)

    deleteUser: () =>
        AxiosInstance.delete('/user').then((res) => res.data), // Supprimer un utilisateur

    // Restaurants
    getRestaurants: () =>
        AxiosInstance.get('/restaurants').then((res) => res.data),

    getRestaurantById: (id) =>
        AxiosInstance.get(`/restaurant/${id}`).then((res) => res.data),

    createRestaurant: (data) =>
        AxiosInstance.post('/restaurants', data).then((res) => res.data),

    updateRestaurant: (id, data) =>
        AxiosInstance.put(`/restaurant/${id}`, data).then((res) => res.data),

    deleteRestaurant: (id) =>
        AxiosInstance.delete(`/restaurant/${id}`).then((res) => res.data),

    // Plats
    getPlats: () =>
        AxiosInstance.get('/dishes').then((res) => res.data),

    getPlatById: (id) =>
        AxiosInstance.get(`/dish/${id}`).then((res) => res.data),

    createPlat: (data) =>
        AxiosInstance.post('/dishes', data).then((res) => res.data),

    updatePlat: (id, data) =>
        AxiosInstance.put(`/dish/${id}`, data).then((res) => res.data),

    deletePlat: (id) =>
        AxiosInstance.delete(`/dish/${id}`).then((res) => res.data),

    // Commandes
    getCommandes: () =>
        AxiosInstance.get('/orders').then((res) => res.data),

    getCommandeById: (id) =>
        AxiosInstance.get(`/order/${id}`).then((res) => res.data),

    createCommande: (data) =>
        AxiosInstance.post('/orders', data).then((res) => res.data),

    updateCommande: (id, data) =>
        AxiosInstance.put(`/order/${id}`, data).then((res) => res.data),

    deleteCommande: (id) =>
        AxiosInstance.delete(`/order/${id}`).then((res) => res.data),

    // Panier
    addToCart: (data) =>
        AxiosInstance.post('/cart', data).then((res) => res.data),

    getCart: (userId) =>
        AxiosInstance.get(`/cart/${userId}`).then((res) => res.data),
};

export default ApiService;
