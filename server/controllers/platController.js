const Plat = require('../models/Plat');

// Cr�er un plat
const createPlat = async (req, res) => {
    try {
        const { nom, description, prix, restaurantId } = req.body;

        const plat = await Plat.create({ nom, description, prix, restaurantId });
        res.status(201).send({ message: 'Plat cr�� avec succ�s', plat });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la cr�ation du plat' });
    }
};

// R�cup�rer tous les plats
const getPlats = async (req, res) => {
    try {
        const plats = await Plat.findAll();
        res.status(200).send(plats);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la r�cup�ration des plats' });
    }
};

// R�cup�rer un plat par ID
const getPlatById = async (req, res) => {
    try {
        const plat = await Plat.findByPk(req.params.id);
        if (!plat) {
            return res.status(404).send({ message: 'Plat non trouv�' });
        }
        res.status(200).send(plat);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la r�cup�ration du plat' });
    }
};

// Mettre � jour un plat
const updatePlat = async (req, res) => {
    try {
        const { nom, description, prix, restaurantId } = req.body;
        const plat = await Plat.findByPk(req.params.id);

        if (!plat) {
            return res.status(404).send({ message: 'Plat non trouv�' });
        }

        plat.nom = nom || plat.nom;
        plat.description = description || plat.description;
        plat.prix = prix || plat.prix;
        plat.restaurantId = restaurantId || plat.restaurantId;

        await plat.save();
        res.status(200).send({ message: 'Plat mis � jour avec succ�s', plat });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la mise � jour du plat' });
    }
};

// Supprimer un plat
const deletePlat = async (req, res) => {
    try {
        const plat = await Plat.findByPk(req.params.id);
        if (!plat) {
            return res.status(404).send({ message: 'Plat non trouv�' });
        }

        await plat.destroy();
        res.status(200).send({ message: 'Plat supprim� avec succ�s' });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la suppression du plat' });
    }
};
module.exports = { createPlat, getPlats, getPlatById, updatePlat, deletePlat };