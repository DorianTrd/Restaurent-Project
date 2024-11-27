const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');  // Assurez-vous d'importer correctement

const Utilisateur = sequelize.define('Utilisateur', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    motDePasse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'utilisateur', // Par exemple : 'utilisateur', 'admin', etc.
    }
}, {
    timestamps: true,  // Permet d'ajouter createdAt et updatedAt automatiquement
});

// Hachage du mot de passe avant de sauvegarder un utilisateur
Utilisateur.beforeCreate(async (utilisateur, options) => {
    if (utilisateur.motDePasse) {
        const hashedPassword = await bcrypt.hash(utilisateur.motDePasse, 10);
        utilisateur.motDePasse = hashedPassword;
    }
});

// Vérifier le mot de passe lors de la connexion
Utilisateur.prototype.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.motDePasse);
};

module.exports = Utilisateur;
