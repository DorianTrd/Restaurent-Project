const Panier = require('../models/Panier');
const Plat = require('../models/Plat');

// Ajouter un plat au panier
exports.addToPanier = async (req, res) => {
    const { utilisateurId, platId, quantite } = req.body;

    try {
        const plat = await Plat.findByPk(platId);
        if (!plat) {
            return res.status(404).json({ message: "Plat non trouvé" });
        }

        const panier = await Panier.create({
            utilisateurId,
            platId,
            quantite,
        });

        res.status(201).json(panier);
    } catch (err) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

// Obtenir tous les plats dans le panier d'un utilisateur
exports.getPanier = async (req, res) => {
    const { utilisateurId } = req.params;

    try {
        const panier = await Panier.findAll({
            where: { utilisateurId },
            include: [Plat],
        });

        res.json(panier);
    } catch (err) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

