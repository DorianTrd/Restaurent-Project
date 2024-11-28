import { loginSuccess, getUserSuccess, registerSuccess } from "../../authSlice";
import axios from "../../../api/AxiosInstance";

export const login =
    ({ email, password }) =>
        async (dispatch) => {
            try {
                const { data } = await axios.post("/login", { email, motDePasse: password }); // Utilise ta propre route pour le login
                const { accessToken } = data;
                dispatch(loginSuccess({ accessToken }));
                dispatch(getUser()); // Récupérer les informations de l'utilisateur
            } catch (error) {
                console.error("Login error:", error);
            }
        };

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/me");  // Récupérer les données utilisateur
        dispatch(getUserSuccess({ user: data }));
    } catch (error) {
        console.error("Get user error:", error);
    }
};

export const register =
    ({ email, password, nom }) =>
        async (dispatch) => {
            try {
                const { data } = await axios.post("/register", { email, motDePasse: password, nom });
                const { accessToken } = data;
                dispatch(registerSuccess({ accessToken }));
                dispatch(getUser());
            } catch (error) {
                console.error("Register error:", error);
            }
        };
