const Plat = require('../models/Plat');

// Créer un plat pour un restaurant
exports.createPlat = async (req, res) => {
    const { restaurantId } = req.params; // ID du restaurant dans l'URL
    const { nom, prix, description, imageUrl } = req.body;

    try {
        const newPlat = await Plat.create({
            nom,
            prix,
            description,
            imageUrl,
            restaurantId
        });

        res.status(201).json({ message: 'Plat créé avec succès', plat: newPlat });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du plat', error });
    }
};

// Récupérer tous les plats d'un restaurant
exports.getPlatsByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const plats = await Plat.findAll({ where: { restaurantId } });
        res.json(plats);
    } catch (error) {
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
        res.status(500).json({ message: 'Erreur lors de la récupération des détails du plat', error });
    }
};

// Mettre à jour un plat pour un restaurant
exports.updatePlat = async (req, res) => {
    const { platId } = req.params;
    const { nom, prix, description, imageUrl } = req.body;

    try {
        const plat = await Plat.findByPk(platId);
        if (!plat) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        // Mise à jour des données
        plat.nom = nom || plat.nom;
        plat.prix = prix || plat.prix;
        plat.description = description || plat.description;
        plat.imageUrl = imageUrl || plat.imageUrl;

        await plat.save();

        res.json({ message: 'Plat mis à jour avec succès', plat });
    } catch (error) {
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
        res.status(500).json({ message: 'Erreur lors de la suppression du plat', error });
    }
};
