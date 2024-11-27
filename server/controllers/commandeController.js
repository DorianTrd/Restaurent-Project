const Commande = require('../models/Commande');
const Plat = require('../models/Plat');

// Cr�er une commande
const createCommande = async (req, res) => {
    try {
        const { plats } = req.body; // Un tableau d'IDs de plats
        const total = await Plat.sum('prix', { where: { id: plats } });

        const commande = await Commande.create({
            utilisateurId: req.user.id,
            total,
            status: 'en cours',
            plats,
        });

        res.status(201).send({ message: 'Commande cr��e avec succ�s', commande });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la cr�ation de la commande' });
    }
};

// R�cup�rer toutes les commandes
const getCommandes = async (req, res) => {
    try {
        const commandes = await Commande.findAll({ where: { utilisateurId: req.user.id } });
        res.status(200).send(commandes);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la r�cup�ration des commandes' });
    }
};

// R�cup�rer une commande par ID
const getCommandeById = async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande) {
            return res.status(404).send({ message: 'Commande non trouv�e' });
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la r�cup�ration de la commande' });
    }
};

// Mettre � jour une commande
const updateCommande = async (req, res) => {
    try {
        const { status } = req.body;
        const commande = await Commande.findByPk(req.params.id);

        if (!commande) {
            return res.status(404).send({ message: 'Commande non trouv�e' });
        }

        commande.status = status || commande.status;
        await commande.save();

        res.status(200).send({ message: 'Commande mise � jour avec succ�s', commande });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la mise � jour de la commande' });
    }
};

// Supprimer une commande
const deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande) {
            return res.status(404).send({ message: 'Commande non trouv�e' });
        }

        await commande.destroy();
        res.status(200).send({ message: 'Commande supprim�e avec succ�s' });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la suppression de la commande' });
    }
};

module.exports = { createCommande, getCommandes, getCommandeById, updateCommande, deleteCommande };
