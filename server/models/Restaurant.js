const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assure-toi que la connexion est correcte

const Restaurant = sequelize.define('Restaurant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codePostal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    motDePasse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,  // Ajoute createdAt et updatedAt automatiquement
});

// Exporter le modèle Restaurant
module.exports = Restaurant;
