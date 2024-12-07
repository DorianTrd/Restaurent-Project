const { Commande, STATUT_COMMANDE } = require('../models/Commande');
const CommandeDetail = require('../models/CommandeDetail');
const Plat = require('../models/Plat');

// Créer une commande (panier)
exports.createCommande = async (req, res) => {
    const { utilisateurId, restaurantId, plats } = req.body; // Utilisateur qui passe la commande et restaurant sélectionné
    const total = plats.reduce((sum, plat) => sum + plat.prix * plat.quantite, 0); // Calcul du total de la commande

    try {
        // Créer la commande
        const newCommande = await Commande.create({
            utilisateurId,
            restaurantId,
            statut: STATUT_COMMANDE.ACTIVE, // La commande est active par défaut
            total
        });

        // Ajouter les détails de la commande (plats)
        const commandeDetails = plats.map(plat => ({
            commandeId: newCommande.id,
            platId: plat.id,
            quantite: plat.quantite
        }));

        await CommandeDetail.bulkCreate(commandeDetails); // Ajouter plusieurs plats en une seule requête

        res.status(201).json({ message: 'Commande créée avec succès', commande: newCommande });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
    }
};

// Récupérer toutes les commandes pour un utilisateur
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
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
};

// Récupérer une commande spécifique par ID
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
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        res.json(commande);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error });
    }
};

// Mettre à jour le statut d'une commande
exports.updateCommandeStatus = async (req, res) => {
    const { commandeId } = req.params;
    const { statut } = req.body; // Statut peut être 'active', 'annulee', 'terminee'

    if (!Object.values(STATUT_COMMANDE).includes(statut)) {
        return res.status(400).json({ message: 'Statut invalide' });
    }

    try {
        const commande = await Commande.findByPk(commandeId);

        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        commande.statut = statut; // Mettre à jour le statut
        await commande.save();

        res.json({ message: 'Statut de la commande mis à jour', commande });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la commande', error });
    }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
    const { commandeId } = req.params;

    try {
        const commande = await Commande.findByPk(commandeId);

        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        await commande.destroy();

        res.json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};
