import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import du Provider
import store from "./store"; // Import du store
import App from "./App";
import { getUser } from "./store/features/auth/authActions";


// Rendu de l'application
ReactDOM.render(
    <StrictMode>
        <Provider store={store}> {/* Le Provider permet d'accéder au store */}
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById("root")
);

if (store.getState().auth?.isAuthenticated) {
    store.dispatch(getUser());
}