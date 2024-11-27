import AxiosInstance from './AxiosInstance';

const ApiService = {
    getRestaurants: () => AxiosInstance.get('/restaurants').then((res) => res.data),
    getRestaurantById: (id) => AxiosInstance.get(`/restaurant/${id}`).then((res) => res.data),
    getPlateById: (id) => AxiosInstance.get(`/plate/${id}`).then((res) => res.data),
    getOrders: () => AxiosInstance.get('/orders').then((res) => res.data),
    getProfile: () => AxiosInstance.get('/profile').then((res) => res.data),
    updateProfile: (data) => AxiosInstance.put('/profile', data),
};

export default ApiService;
