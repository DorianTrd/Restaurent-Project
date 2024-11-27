// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');  // Connexion à la base de données
const routes = require('./routes/routes');      // Routes principales

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Intégration des routes
app.use('/api', routes);

// Synchronisation des modèles avec la base de données
sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server running on http://localhost:5000');
        });
    })
    .catch((err) => {
        console.error('Error syncing the database', err);
    });
