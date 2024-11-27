const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Utilisateur = require('./Utilisateur');
const Plat = require('./Plat');

const Commande = sequelize.define('Commande', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en attente',
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Commande.belongsTo(Utilisateur, {
    foreignKey: 'utilisateurId',
    onDelete: 'CASCADE',
});

Commande.belongsToMany(Plat, {
    through: 'CommandePlat',
    foreignKey: 'commandeId',
});

Plat.belongsToMany(Commande, {
    through: 'CommandePlat',
    foreignKey: 'platId',
});

module.exports = Commande;
