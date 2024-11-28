import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
    },
    isAuthenticated: !!localStorage.getItem("accessToken"),
    token: localStorage.getItem("accessToken") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem("accessToken");
        },
        loginSuccess: (state, action) => {
            console.log(action.payload)
            const { accessToken } = action.payload;
            state.token = accessToken;
            state.isAuthenticated = true;
            localStorage.setItem("accessToken", accessToken);
        },
        registerSuccess: (state, action) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
            state.isAuthenticated = true;
            localStorage.setItem("accessToken", accessToken);
        },
        getUserSuccess: (state, action) => {
            const { user } = action.payload;
            state.user = user;
        },
    },
});

export const { loginSuccess, registerSuccess, getUserSuccess, logout } =
    authSlice.actions;

export default authSlice.reducer;
