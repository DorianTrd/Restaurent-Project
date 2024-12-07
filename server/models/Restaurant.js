const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuration de la base de données

const Restaurant = sequelize.define(
    'Restaurant',
    {
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
        },
        utilisateurId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'utilisateurs', // Nom de la table Utilisateur
                key: 'id',
            },
            onDelete: 'CASCADE', // Supprime le restaurant si l'utilisateur est supprimé
        },
    },
    {
        sequelize,
        tableName: 'restaurants', // Nom de la table dans la base de données
        timestamps: true, // Inclure createdAt et updatedAt
    }
);

module.exports = Restaurant;
