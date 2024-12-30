const sequelize = require('../config/database');

// Importation des mod�les
const { Utilisateur } = require('./Utilisateur');
const Restaurant = require('./Restaurant');
const { Commande, STATUT_COMMANDE } = require('./Commande');
const CommandeDetail = require('./CommandeDetail');
const Plat = require('./Plat');

// D�finition des relations
const setupAssociations = () => {
    // Relations Utilisateur -> Restaurant
    Utilisateur.hasOne(Restaurant, {
        foreignKey: 'utilisateurId',
        as: 'restaurant',
        onDelete: 'CASCADE', // Supprime le restaurant si l'utilisateur est supprim�
    });
    Restaurant.belongsTo(Utilisateur, {
        foreignKey: 'utilisateurId',
        as: 'proprietaire',
    });

    // Relations Restaurant -> Plat
    Restaurant.hasMany(Plat, {
        foreignKey: 'restaurantId',
        as: 'plats',
        onDelete: 'CASCADE', // Supprime les plats si le restaurant est supprim�
    });
    Plat.belongsTo(Restaurant, {
        foreignKey: 'restaurantId',
        as: 'restaurant',
    });

    // Relations Utilisateur -> Commande
    Utilisateur.hasMany(Commande, {
        foreignKey: 'utilisateurId',
        as: 'commandes',
        onDelete: 'CASCADE', // Supprime les commandes si l'utilisateur est supprim�
    });
    Commande.belongsTo(Utilisateur, {
        foreignKey: 'utilisateurId',
        as: 'utilisateur',
    });

    // Relations Restaurant -> Commande
    Restaurant.hasMany(Commande, {
        foreignKey: 'restaurantId',
        as: 'commandes',
        onDelete: 'CASCADE', // Supprime les commandes si le restaurant est supprim�
    });
    Commande.belongsTo(Restaurant, {
        foreignKey: 'restaurantId',
        as: 'restaurant',
    });

    // Relations Commande -> CommandeDetail
    Commande.hasMany(CommandeDetail, {
        foreignKey: 'commandeId',
        as: 'details',
        onDelete: 'CASCADE', // Supprime les d�tails si la commande est supprim�e
    });
    CommandeDetail.belongsTo(Commande, {
        foreignKey: 'commandeId',
        as: 'commande',
    });

    // Relations Plat -> CommandeDetail
    Plat.hasMany(CommandeDetail, {
        foreignKey: 'platId',
        as: 'details',
        onDelete: 'CASCADE', // Supprime les d�tails si le plat est supprim�
    });
    CommandeDetail.belongsTo(Plat, {
        foreignKey: 'platId',
        as: 'plat',
    });
};


module.exports = {
    sequelize,
    setupAssociations,
    Utilisateur,
    Restaurant,
    Commande,
    STATUT_COMMANDE,
    CommandeDetail,
    Plat,
};
