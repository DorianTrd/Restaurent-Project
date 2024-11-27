const Restaurant = require('../models/Restaurant');

// Cr�er un restaurant
const createRestaurant = async (req, res) => {
    try {
        const { nom, adresse, codePostal, ville, email } = req.body;

        const restaurant = await Restaurant.create({ nom, adresse, codePostal, ville, email });
        res.status(201).send({ message: 'Restaurant cr�� avec succ�s', restaurant });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la cr�ation du restaurant' });
    }
};

// R�cup�rer tous les restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la r�cup�ration des restaurants' });
    }
};

// R�cup�rer un restaurant par ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant non trouv�' });
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la r�cup�ration du restaurant' });
    }
};

// Mettre � jour un restaurant
const updateRestaurant = async (req, res) => {
    try {
        const { nom, adresse, codePostal, ville, email } = req.body;
        const restaurant = await Restaurant.findByPk(req.params.id);

        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant non trouv�' });
        }

        restaurant.nom = nom || restaurant.nom;
        restaurant.adresse = adresse || restaurant.adresse;
        restaurant.codePostal = codePostal || restaurant.codePostal;
        restaurant.ville = ville || restaurant.ville;
        restaurant.email = email || restaurant.email;

        await restaurant.save();
        res.status(200).send({ message: 'Restaurant mis � jour avec succ�s', restaurant });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la mise � jour du restaurant' });
    }
};

// Supprimer un restaurant
const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant non trouv�' });
        }

        await restaurant.destroy();
        res.status(200).send({ message: 'Restaurant supprim� avec succ�s' });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la suppression du restaurant' });
    }
};

module.exports = { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
