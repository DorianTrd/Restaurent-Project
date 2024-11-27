// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');  // Connexion � la base de donn�es
const routes = require('./routes/routes');      // Routes principales

const app = express();

// Middleware pour analyser les requ�tes JSON
app.use(bodyParser.json());

// Int�gration des routes
app.use('/api', routes);

// Synchronisation des mod�les avec la base de donn�es
sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server running on http://localhost:5000');
        });
    })
    .catch((err) => {
        console.error('Error syncing the database', err);
    });
