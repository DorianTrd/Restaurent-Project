const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Middleware CORS
const sequelize = require('./config/database'); // Connexion � la base de donn�es
const routes = require('./routes/routes'); // Routes principales

const app = express();

// Middleware CORS pour g�rer les requ�tes cross-origin
app.use(cors({
    origin: 'http://localhost:5000', // Autoriser uniquement cette origine
    methods: 'GET,POST,PUT,DELETE', // M�thodes autoris�es
    allowedHeaders: 'Content-Type,Authorization,x-access-token' // Ajouter x-access-token
}));

// Middleware pour analyser les requ�tes JSON
app.use(bodyParser.json());

// Int�gration des routes
app.use('/api', routes);  // Assure-toi que toutes les routes sont bien accessibles via /api

// Synchronisation des mod�les avec la base de donn�es
sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server running on http://localhost:5000');
        });
    })
    .catch((err) => {
        console.error('Error syncing the database:', err);
    });
