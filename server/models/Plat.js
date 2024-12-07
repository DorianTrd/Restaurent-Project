const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plat = sequelize.define('Plat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    imageUrl: { // Champ pour stocker l'URL de l'image
        type: DataTypes.STRING,
        allowNull: true, // Optionnel : les plats peuvent ne pas avoir d'image
        validate: {
            isUrl: true // Valide que le contenu est une URL
        }
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Restaurants', // Table Restaurant
            key: 'id'
        }
    }
}, {
    timestamps: true,
});

module.exports = Plat;
