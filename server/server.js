const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Middleware CORS
const sequelize = require('./config/database'); // Connexion à la base de données
const routes = require('./routes/routes'); // Routes principales

const app = express();

// Middleware CORS pour gérer les requêtes cross-origin
app.use(cors({
    origin: 'http://localhost:5000', // Autoriser uniquement cette origine
    methods: 'GET,POST,PUT,DELETE', // Méthodes autorisées
    allowedHeaders: 'Content-Type,Authorization,x-access-token' // Ajouter x-access-token
}));

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Intégration des routes
app.use('/api', routes);  // Assure-toi que toutes les routes sont bien accessibles via /api

// Synchronisation des modèles avec la base de données
sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server running on http://localhost:5000');
        });
    })
    .catch((err) => {
        console.error('Error syncing the database:', err);
    });
