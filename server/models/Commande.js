const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const STATUT_COMMANDE = {
    ACTIVE: 'active',
    ANNULEE: 'annulee',
    TERMINEE: 'terminee'
};

const Commande = sequelize.define('Commande', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    utilisateurId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Utilisateurs', // Table Utilisateurs
            key: 'id'
        }
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Restaurants', // Table Restaurants
            key: 'id'
        }
    },
    statut: {
        type: DataTypes.ENUM(Object.values(STATUT_COMMANDE)),
        allowNull: false,
        defaultValue: STATUT_COMMANDE.ACTIVE // La commande est active par défaut
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    dateCreation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Date de création par défaut à la date actuelle
    }
}, {
    timestamps: true,
});

module.exports = { Commande, STATUT_COMMANDE };
