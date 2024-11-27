const Restaurant = require('../models/Restaurant');

// Créer un restaurant
const createRestaurant = async (req, res) => {
    try {
        const { nom, adresse, codePostal, ville, email } = req.body;

        const restaurant = await Restaurant.create({ nom, adresse, codePostal, ville, email });
        res.status(201).send({ message: 'Restaurant créé avec succès', restaurant });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la création du restaurant' });
    }
};

// Récupérer tous les restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération des restaurants' });
    }
};

// Récupérer un restaurant par ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant non trouvé' });
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération du restaurant' });
    }
};

// Mettre à jour un restaurant
const updateRestaurant = async (req, res) => {
    try {
        const { nom, adresse, codePostal, ville, email } = req.body;
        const restaurant = await Restaurant.findByPk(req.params.id);

        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant non trouvé' });
        }

        restaurant.nom = nom || restaurant.nom;
        restaurant.adresse = adresse || restaurant.adresse;
        restaurant.codePostal = codePostal || restaurant.codePostal;
        restaurant.ville = ville || restaurant.ville;
        restaurant.email = email || restaurant.email;

        await restaurant.save();
        res.status(200).send({ message: 'Restaurant mis à jour avec succès', restaurant });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la mise à jour du restaurant' });
    }
};

// Supprimer un restaurant
const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant non trouvé' });
        }

        await restaurant.destroy();
        res.status(200).send({ message: 'Restaurant supprimé avec succès' });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la suppression du restaurant' });
    }
};

module.exports = { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
