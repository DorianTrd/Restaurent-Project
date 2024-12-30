const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
                model: 'utilisateurs',
                key: 'id',
            },
            onDelete: 'CASCADE', // Supprime le restaurant si l'utilisateur est supprim�
        },
    },
    {
        sequelize,
        tableName: 'restaurants',
        timestamps: true,
    }
);

module.exports = Restaurant;
