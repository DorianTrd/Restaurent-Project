const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Commande = require('./Commande');
const Plat = require('./Plat');

const CommandeDetail = sequelize.define('CommandeDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commandeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Commandes',
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
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {
    tableName: 'commande_details',
    timestamps: false,
});

module.exports = CommandeDetail;
