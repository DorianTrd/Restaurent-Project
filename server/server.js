// Importations nécessaires
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Assurez-vous que ce chemin est correct
const routes = require('./routes/routes'); // Assurez-vous que ce chemin est correct

// Initialisation de l'application Express
const app = express();

// Chargement des variables d'environnement depuis un fichier .env
dotenv.config();

// Middleware
app.use(express.json()); // Pour parser les requêtes en JSON
app.use(cors()); // Pour autoriser les requêtes cross-origin

// Routes
app.use('/api', routes); // Lien vers les routes définies dans routes.js

// Synchronisation avec la base de données
sequelize.sync({ force: false })
    .then(() => {
        console.log('La base de données a été synchronisée avec succès.');
    })
    .catch((error) => {
        console.error('Erreur lors de la synchronisation de la base de données:', error);
    });

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});
