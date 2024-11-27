const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Panier = sequelize.define('Panier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantite: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    timestamps: true,  // Ajoute createdAt et updatedAt automatiquement
});

// Association avec l'utilisateur (un panier appartient à un utilisateur)
Panier.associate = (models) => {
    Panier.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateurId',
        onDelete: 'CASCADE',
    });

    // Association avec les plats (un panier contient plusieurs plats)
    Panier.belongsTo(models.Plat, {
        foreignKey: 'platId',
        onDelete: 'CASCADE',
    });
};

module.exports = Panier;
