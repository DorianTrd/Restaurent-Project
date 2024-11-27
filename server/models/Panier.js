const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Panier = sequelize.define('Panier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    utilisateurId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Utilisateurs',
            key: 'id'
        }
    },
    platId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Plats',
            key: 'id'
        }
    }
}, {
    timestamps: true,
});

module.exports = Panier;
