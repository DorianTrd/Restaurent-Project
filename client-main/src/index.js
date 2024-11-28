import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import du Provider
import store from "./store"; // Import du store
import App from "./App";


// Rendu de l'application
ReactDOM.render(
    <StrictMode>
        <Provider store={store}> {/* Le Provider permet d'accéder au store */}
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById("root")
);
