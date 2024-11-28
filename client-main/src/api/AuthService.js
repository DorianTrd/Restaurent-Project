import AxiosInstance from './AxiosInstance';

const AuthService = {
    login: (data) => AxiosInstance.post('/login', data),
    register: (data) => AxiosInstance.post('/register', data),
    getUser: (data) => AxiosInstance.get('/user', data),
};

export default AuthService;
