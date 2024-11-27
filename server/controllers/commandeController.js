const Commande = require('../models/Commande');
const Plat = require('../models/Plat');

// Créer une commande
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

        res.status(201).send({ message: 'Commande créée avec succès', commande });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la création de la commande' });
    }
};

// Récupérer toutes les commandes
const getCommandes = async (req, res) => {
    try {
        const commandes = await Commande.findAll({ where: { utilisateurId: req.user.id } });
        res.status(200).send(commandes);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération des commandes' });
    }
};

// Récupérer une commande par ID
const getCommandeById = async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande) {
            return res.status(404).send({ message: 'Commande non trouvée' });
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération de la commande' });
    }
};

// Mettre à jour une commande
const updateCommande = async (req, res) => {
    try {
        const { status } = req.body;
        const commande = await Commande.findByPk(req.params.id);

        if (!commande) {
            return res.status(404).send({ message: 'Commande non trouvée' });
        }

        commande.status = status || commande.status;
        await commande.save();

        res.status(200).send({ message: 'Commande mise à jour avec succès', commande });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la mise à jour de la commande' });
    }
};

// Supprimer une commande
const deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande) {
            return res.status(404).send({ message: 'Commande non trouvée' });
        }

        await commande.destroy();
        res.status(200).send({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la suppression de la commande' });
    }
};

module.exports = { createCommande, getCommandes, getCommandeById, updateCommande, deleteCommande };
