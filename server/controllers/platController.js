const Plat = require('../models/Plat');
const {Restaurant, Utilisateur} = require("../models");

// Créer un plat pour un restaurant
exports.createPlat = async (req, res) => {
    const { restaurantId } = req.params;  // Récupérer l'ID du restaurant depuis l'URL
    const { nom, description, prix } = req.body;

    try {
        // Vérification si l'utilisateur est un restaurateur et qu'il est bien lié au restaurant
        const utilisateur = await Utilisateur.findByPk(req.user.id);  // Utilisateur authentifié via JWT
        if (!utilisateur || utilisateur.role !== 'restaurateur') {
            return res.status(403).json({ message: 'Rôle insuffisant. Vous devez être restaurateur.' });
        }

        // Vérifier que le restaurant existe et qu'il appartient à l'utilisateur
        const restaurant = await Restaurant.findByPk(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé.' });
        }

        if (restaurant.utilisateurId !== utilisateur.id) {
            return res.status(403).json({ message: 'Vous n\'avez pas l\'autorisation de gérer ce restaurant.' });
        }

        // Créer le plat
        const plat = await Plat.create({
            nom,
            description,
            prix,
            restaurantId  // Associer le plat au restaurant
        });

        return res.status(201).json(plat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la création du plat', error: error.message });
    }
};

// Récupérer tous les plats d'un restaurant
exports.getPlatsByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        // Vérifier si le restaurant existe
        const restaurant = await Plat.sequelize.models.Restaurant.findByPk(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        // Récupérer les plats du restaurant
        const plats = await Plat.findAll({ where: { restaurantId } });
        res.json(plats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des plats', error });
    }
};

// Récupérer les détails d'un plat par ID pour un restaurant
exports.getPlatDetails = async (req, res) => {
    const { restaurantId, platId } = req.params;

    try {
        const plat = await Plat.findOne({
            where: { id: platId, restaurantId },
        });

        if (!plat) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        res.json(plat);  // Retourne les détails du plat
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des détails du plat', error });
    }
};

// Mettre à jour un plat pour un restaurant
exports.updatePlat = async (req, res) => {
    const { platId } = req.params;
    const { nom, prix, description } = req.body;

    try {
        const plat = await Plat.findByPk(platId);
        if (!plat) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        // Mise à jour des données
        plat.nom = nom || plat.nom;
        plat.prix = prix || plat.prix;
        plat.description = description || plat.description;

        await plat.save();

        res.json({ message: 'Plat mis à jour avec succès', plat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du plat', error });
    }
};

// Supprimer un plat
exports.deletePlat = async (req, res) => {
    const { platId } = req.params;

    try {
        const plat = await Plat.findByPk(platId);
        if (!plat) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        await plat.destroy();

        res.json({ message: 'Plat supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du plat', error });
    }
};
