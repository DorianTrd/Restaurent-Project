const Plat = require('../models/Plat');

// Créer un plat
const createPlat = async (req, res) => {
    try {
        const { nom, description, prix, restaurantId } = req.body;

        const plat = await Plat.create({ nom, description, prix, restaurantId });
        res.status(201).send({ message: 'Plat créé avec succès', plat });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la création du plat' });
    }
};

// Récupérer tous les plats
const getPlats = async (req, res) => {
    try {
        const plats = await Plat.findAll();
        res.status(200).send(plats);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération des plats' });
    }
};

// Récupérer un plat par ID
const getPlatById = async (req, res) => {
    try {
        const plat = await Plat.findByPk(req.params.id);
        if (!plat) {
            return res.status(404).send({ message: 'Plat non trouvé' });
        }
        res.status(200).send(plat);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération du plat' });
    }
};

// Mettre à jour un plat
const updatePlat = async (req, res) => {
    try {
        const { nom, description, prix, restaurantId } = req.body;
        const plat = await Plat.findByPk(req.params.id);

        if (!plat) {
            return res.status(404).send({ message: 'Plat non trouvé' });
        }

        plat.nom = nom || plat.nom;
        plat.description = description || plat.description;
        plat.prix = prix || plat.prix;
        plat.restaurantId = restaurantId || plat.restaurantId;

        await plat.save();
        res.status(200).send({ message: 'Plat mis à jour avec succès', plat });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la mise à jour du plat' });
    }
};

// Supprimer un plat
const deletePlat = async (req, res) => {
    try {
        const plat = await Plat.findByPk(req.params.id);
        if (!plat) {
            return res.status(404).send({ message: 'Plat non trouvé' });
        }

        await plat.destroy();
        res.status(200).send({ message: 'Plat supprimé avec succès' });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la suppression du plat' });
    }
};
module.exports = { createPlat, getPlats, getPlatById, updatePlat, deletePlat };