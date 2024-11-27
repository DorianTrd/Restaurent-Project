const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assure-toi que le chemin est correct

const Utilisateur = sequelize.define('Utilisateur', {
    // Définition de tes attributs
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    motDePasse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('utilisateur', 'admin', 'restaurateur'),
        defaultValue: 'utilisateur'
    }
});

module.exports = { Utilisateur };
