const Restaurant = require('../models/Restaurant');

// Créer un restaurant
exports.createRestaurant = async (req, res) => {
    const { utilisateurId, nom, adresse, codePostal, ville, email } = req.body;

    try {
        const newRestaurant = await Restaurant.create({
            utilisateurId,
            nom,
            adresse,
            codePostal,
            ville,
            email,
        });

        res.status(201).json({ message: 'Restaurant créé avec succès', restaurant: newRestaurant });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du restaurant', error });
    }
};

// Récupérer tous les restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des restaurants', error });
    }
};

// Récupérer un restaurant par ID
exports.getRestaurantById = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du restaurant', error });
    }
};

// Modifier un restaurant
exports.updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { nom, adresse, codePostal, ville, email } = req.body;

    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        // Mise à jour des données
        restaurant.nom = nom || restaurant.nom;
        restaurant.adresse = adresse || restaurant.adresse;
        restaurant.codePostal = codePostal || restaurant.codePostal;
        restaurant.ville = ville || restaurant.ville;
        restaurant.email = email || restaurant.email;

        await restaurant.save();

        res.json({ message: 'Restaurant mis à jour avec succès', restaurant });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du restaurant', error });
    }
};

// Supprimer un restaurant
exports.deleteRestaurant = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        await restaurant.destroy();

        res.json({ message: 'Restaurant supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du restaurant', error });
    }
};
