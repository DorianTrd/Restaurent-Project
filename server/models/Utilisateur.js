// models/Utilisateur.js
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que le chemin est correct

const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'utilisateur',
    RESTAURATEUR: 'restaurateur',
};

class Utilisateur extends Model {
    toJSON() {
        const values = { ...this.get() }; // Récupérer toutes les valeurs
        delete values.motDePasse; // Supprimer le mot de passe
        return values;
    }
}

Utilisateur.init(
    {
        role: {
            type: DataTypes.ENUM(Object.values(USER_ROLES)),
            allowNull: false,
            defaultValue: USER_ROLES.USER, // Valeur par défaut
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
        tableName: 'utilisateurs', // Assurez-vous que le nom de la table est correct
        timestamps: true, // Activer les timestamps (createdAt, updatedAt)
    }
);

// Exportez à la fois le modèle Utilisateur et l'objet USER_ROLES
module.exports = { Utilisateur, USER_ROLES };
