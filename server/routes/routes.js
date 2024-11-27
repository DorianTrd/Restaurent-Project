// routes/routes.js
const express = require('express');
const router = express.Router();




// Importation correcte des contrôleurs
const utilisateurController = require('../controllers/utilisateurController');
const platController = require('../controllers/platController');
const restaurantController = require('../controllers/restaurantController');
const commandeController = require('../controllers/commandeController');
const panierController = require('../controllers/panierController');
const { body } = require('express-validator');
const authController = require('../controllers/authController')
const validateMiddleware = require('../middleware/validateMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
    '/register',
    [
        // Validation des champs d'inscription
        body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').notEmpty().withMessage('Le nom est obligatoire')
    ],
    validateMiddleware, // Applique le middleware de validation
    authController.signup // Appelle la méthode signup du contrôleur
);

// Route pour la connexion (login)
router.post(
    '/login',
    [
        // Validation des champs de connexion
        body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
    ],
    validateMiddleware, // Applique le middleware de validation
    authController.login // Appelle la méthode login du contrôleur
);

// Routes pour les utilisateurs
router.post('/utilisateurs', utilisateurController.createUtilisateur); 
router.get('/utilisateur', [
    authMiddleware
],utilisateurController.getUtilisateur);
router.put('/utilisateur', utilisateurController.updateUtilisateur);
router.delete('/utilisateur', utilisateurController.deleteUtilisateur);

// Routes pour les plats
router.post('/plats', platController.createPlat);
router.get('/plats', platController.getPlats);
router.get('/plat/:id', platController.getPlatById);
router.put('/plat/:id', platController.updatePlat);
router.delete('/plat/:id', platController.deletePlat);

// Routes pour les restaurants
router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurant/:id', restaurantController.getRestaurantById);
router.put('/restaurant/:id', restaurantController.updateRestaurant);
router.delete('/restaurant/:id', restaurantController.deleteRestaurant);

// Routes pour les commandes
router.post('/commandes', commandeController.createCommande);
router.get('/commandes', commandeController.getCommandes);
router.get('/commande/:id', commandeController.getCommandeById);
router.put('/commande/:id', commandeController.updateCommande);
router.delete('/commande/:id', commandeController.deleteCommande);

// Routes pour le panier
router.post('/panier', panierController.addToPanier);
router.get('/panier/:utilisateurId', panierController.getPanier);

module.exports = router;
