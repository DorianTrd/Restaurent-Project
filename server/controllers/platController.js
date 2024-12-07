const Plat = require('../models/Plat');

// Cr�er un plat pour un restaurant
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

        res.status(201).json({ message: 'Plat cr�� avec succ�s', plat: newPlat });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la cr�ation du plat', error });
    }
};

// R�cup�rer tous les plats d'un restaurant
exports.getPlatsByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const plats = await Plat.findAll({ where: { restaurantId } });
        res.json(plats);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des plats', error });
    }
};

// R�cup�rer les d�tails d'un plat par ID pour un restaurant
exports.getPlatDetails = async (req, res) => {
    const { restaurantId, platId } = req.params;

    try {
        const plat = await Plat.findOne({
            where: { id: platId, restaurantId },
        });

        if (!plat) {
            return res.status(404).json({ message: 'Plat non trouv�' });
        }

        res.json(plat);  // Retourne les d�tails du plat
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des d�tails du plat', error });
    }
};

// Mettre � jour un plat pour un restaurant
exports.updatePlat = async (req, res) => {
    const { platId } = req.params;
    const { nom, prix, description, imageUrl } = req.body;

    try {
        const plat = await Plat.findByPk(platId);
        if (!plat) {
            return res.status(404).json({ message: 'Plat non trouv�' });
        }

        // Mise � jour des donn�es
        plat.nom = nom || plat.nom;
        plat.prix = prix || plat.prix;
        plat.description = description || plat.description;
        plat.imageUrl = imageUrl || plat.imageUrl;

        await plat.save();

        res.json({ message: 'Plat mis � jour avec succ�s', plat });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise � jour du plat', error });
    }
};

// Supprimer un plat
exports.deletePlat = async (req, res) => {
    const { platId } = req.params;

    try {
        const plat = await Plat.findByPk(platId);
        if (!plat) {
            return res.status(404).json({ message: 'Plat non trouv�' });
        }

        await plat.destroy();

        res.json({ message: 'Plat supprim� avec succ�s' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du plat', error });
    }
};
