const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

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
            defaultValue: USER_ROLES.USER, // R�le par d�faut
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
        tableName: 'utilisateurs',
        timestamps: true,
    }
);

module.exports = { Utilisateur, USER_ROLES };
