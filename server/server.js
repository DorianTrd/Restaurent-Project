// Importations n�cessaires
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
app.use(express.json()); // Pour parser les requ�tes en JSON
app.use(cors()); // Pour autoriser les requ�tes cross-origin

// Routes
app.use('/api', routes); // Lien vers les routes d�finies dans routes.js

// Synchronisation avec la base de donn�es
sequelize.sync({ force: false })
    .then(() => {
        console.log('La base de donn�es a �t� synchronis�e avec succ�s.');
    })
    .catch((error) => {
        console.error('Erreur lors de la synchronisation de la base de donn�es:', error);
    });

// D�marrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});
