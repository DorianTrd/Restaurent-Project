const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Configuration de la base de données

const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'utilisateur',
    RESTAURATEUR: 'restaurateur',
};

class Utilisateur extends Model {
    toJSON() {
        return {
            email: this.email,
            role: this.role,
        };
    }
}

Utilisateur.init(
    {
        role: {
            type: DataTypes.ENUM(Object.values(USER_ROLES)),
            allowNull: false,
            defaultValue: USER_ROLES.USER, // Rôle par défaut
        },
        motDePasse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Email unique
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false, // Nom obligatoire
        },
    },
    {
        sequelize,
        modelName: 'Utilisateur',
        tableName: 'utilisateurs', // Nom de la table dans la base de données
        timestamps: true, // Inclure createdAt et updatedAt
    }
);

module.exports = { Utilisateur, USER_ROLES };
