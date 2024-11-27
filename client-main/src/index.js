// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ton composant principal
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter> {/* Le Router englobe l'application entière */}
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
