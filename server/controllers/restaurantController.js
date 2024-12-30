const Restaurant = require('../models/Restaurant');
const {Utilisateur, USER_ROLES} = require("../models/Utilisateur");
const bcrypt = require('bcryptjs');

// Cr�er un restaurant
exports.createRestaurant = async (req, res) => {
    const { nom, adresse, codePostal, ville, email, password } = req.body;

    if (!nom || !adresse || !codePostal || !ville || !email || !password) {
        return res.status(400).json({
            message: 'Tous les champs sont requis',
            missingFields: {
                nom, adresse, codePostal, ville, email, password
            }
        });
    }

    try {
        // Hachage du mot de passe avant de le stocker
        const hashedPassword = await bcrypt.hash(password, 10);

        const utilisateur = await Utilisateur.create({
            email,
            motDePasse: hashedPassword,
            role: USER_ROLES.RESTAURATEUR,
            nom: nom,
        });

        const newRestaurant = await Restaurant.create({
            nom,
            adresse,
            codePostal,
            ville,
            email,
            utilisateurId: utilisateur.id,
        });

        res.status(201).json({
            message: 'Restaurant et utilisateur créés avec succès',
            utilisateur,
            restaurant: newRestaurant,
        });
    } catch (error) {
        console.error("Erreur lors de la création du restaurant et de l'utilisateur:", error);
        res.status(500).json({
            message: 'Erreur lors de la création du restaurant et de l\'utilisateur',
            error: error.message,
        });
    }
};

// R�cup�rer tous les restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration des restaurants', error });
    }
};

// R�cup�rer un restaurant par ID
exports.getRestaurantById = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouv�' });
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la r�cup�ration du restaurant', error });
    }
};

// Modifier un restaurant
exports.updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { nom, adresse, codePostal, ville, email } = req.body;

    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouv�' });
        }

        // Mise � jour des donn�es
        restaurant.nom = nom || restaurant.nom;
        restaurant.adresse = adresse || restaurant.adresse;
        restaurant.codePostal = codePostal || restaurant.codePostal;
        restaurant.ville = ville || restaurant.ville;
        restaurant.email = email || restaurant.email;

        await restaurant.save();

        res.json({ message: 'Restaurant mis � jour avec succ�s', restaurant });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise � jour du restaurant', error });
    }
};

// Supprimer un restaurant
exports.deleteRestaurant = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouv�' });
        }

        await restaurant.destroy();

        res.json({ message: 'Restaurant supprim� avec succ�s' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du restaurant', error });
    }
};
