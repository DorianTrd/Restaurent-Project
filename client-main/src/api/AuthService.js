import AxiosInstance from './AxiosInstance';

const AuthService = {
    login: (data) => AxiosInstance.post('/login', data),
    register: (data) => AxiosInstance.post('/register', data),
};

export default AuthService;
