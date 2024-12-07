const { Commande, STATUT_COMMANDE } = require('../models/Commande');
const CommandeDetail = require('../models/CommandeDetail');
const Plat = require('../models/Plat');

// Cr�er une commande (panier)
exports.createCommande = async (req, res) => {
    const { utilisateurId, restaurantId, plats } = req.body; // Utilisateur qui passe la commande et restaurant s�lectionn�
    const total = plats.reduce((sum, plat) => sum + plat.prix * plat.quantite, 0); // Calcul du total de la commande

    try {
        // Cr�er la commande
        const newCommande = await Commande.create({
            utilisateurId,
            restaurantId,
            statut: STATUT_COMMANDE.ACTIVE, // La commande est active par d�faut
            total
        });

        // Ajouter les d�tails de la commande (plats)
        const commandeDetails = plats.map(plat => ({
            commandeId: newCommande.id,
            platId: plat.id,
            quantite: plat.quantite
        }));

        await CommandeDetail.bulkCreate(commandeDetails); // Ajouter plusieurs plats en une seule requ�te

        res.status(201).json({ message: 'Commande cr��e avec succ�s', commande: newCommande });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la cr�ation de la commande', error });
    }
};

// R�cup�rer toutes les commandes pour un utilisateur
exports.getCommandesByUser = async (req, res) => {
    const { utilisateurId } = req.params;

    try {
        const commandes = await Commande.findAll({
            where: { utilisateurId },
            include: [{
                model: CommandeDetail,
                as: 'details',
                include: [{
                    model: Plat,
                    as: 'plat'
                }]
            }]
        });

        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des commandes', error });
    }
};

// R�cup�rer une commande sp�cifique par ID
exports.getCommandeById = async (req, res) => {
    const { commandeId } = req.params;

    try {
        const commande = await Commande.findOne({
            where: { id: commandeId },
            include: [{
                model: CommandeDetail,
                as: 'details',
                include: [{
                    model: Plat,
                    as: 'plat'
                }]
            }]
        });

        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouv�e' });
        }

        res.json(commande);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration de la commande', error });
    }
};

// Mettre � jour le statut d'une commande
exports.updateCommandeStatus = async (req, res) => {
    const { commandeId } = req.params;
    const { statut } = req.body; // Statut peut �tre 'active', 'annulee', 'terminee'

    if (!Object.values(STATUT_COMMANDE).includes(statut)) {
        return res.status(400).json({ message: 'Statut invalide' });
    }

    try {
        const commande = await Commande.findByPk(commandeId);

        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouv�e' });
        }

        commande.statut = statut; // Mettre � jour le statut
        await commande.save();

        res.json({ message: 'Statut de la commande mis � jour', commande });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise � jour du statut de la commande', error });
    }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
    const { commandeId } = req.params;

    try {
        const commande = await Commande.findByPk(commandeId);

        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouv�e' });
        }

        await commande.destroy();

        res.json({ message: 'Commande supprim�e avec succ�s' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};
