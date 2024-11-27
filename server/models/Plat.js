const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Restaurant = require('./Restaurant'); // Importation du modèle Restaurant

const Plat = sequelize.define('Plat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Plat.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
    onDelete: 'CASCADE',
});

module.exports = Plat;
