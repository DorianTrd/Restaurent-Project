
import { loginSuccess, getUserSuccess, registerSuccess } from "../../authSlice";
import store from "../../index";
import authService from "../../../api/AuthService";

export const login =
    ({ email, motDePasse }) =>
        async (dispatch) => {
            try {
                const { data } = await authService.login({
                    email, motDePasse
                });
                await dispatch(loginSuccess({ accessToken : data.token }));
                store.dispatch(getUser());
            } catch (error) { }
        };

export const getUser = () => async (dispatch) => {
    try {
        const {data} = await authService.getUser();
        dispatch(getUserSuccess({ user : data }));
    } catch (error) { }
};

export const register =
    ({ email, password, name }) =>
        async (dispatch) => {
            try {
                const {data } = await authService.register({
                    email, motDePasse: password, nom: name
                });
                await dispatch(registerSuccess({ accessToken  : data.token}));
                store.dispatch(getUser());
            } catch (error) { }
        }
