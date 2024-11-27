const express = require('express');
const router = express.Router();

// Importation des contrôleurs
const utilisateurController = require('../controllers/utilisateurController');
const platController = require('../controllers/platController');
const restaurantController = require('../controllers/restaurantController');
const commandeController = require('../controllers/commandeController');
const panierController = require('../controllers/panierController');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validateMiddleware = require('../middleware/validateMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');  

// Routes d'authentification
router.post(
    '/register',
    [
        // Validation des champs d'inscription
        body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').notEmpty().withMessage('Le nom est obligatoire')
    ],
    validateMiddleware,  // Applique le middleware de validation
    authController.signup // Appelle la méthode signup du contrôleur
);

router.post(
    '/login',
    [
        // Validation des champs de connexion
        body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
    ],
    validateMiddleware,  // Applique le middleware de validation
    authController.login // Appelle la méthode login du contrôleur
);

// Routes pour les utilisateurs (accessible uniquement aux admins)
router.post('/users', authMiddleware, roleMiddleware('admin'), utilisateurController.createUtilisateur);  // Créer un utilisateur
router.get('/users', authMiddleware, roleMiddleware('admin'), utilisateurController.getUtilisateurs); // Récupérer tous les utilisateurs
router.get('/user', authMiddleware, utilisateurController.getUtilisateur);  // Récupérer un utilisateur spécifique
router.put('/user', authMiddleware, utilisateurController.updateUtilisateur);  // Mettre à jour un utilisateur
router.delete('/user', authMiddleware, roleMiddleware('admin'), utilisateurController.deleteUtilisateur);  // Supprimer un utilisateur

// Routes pour les plats
router.post('/dishes', authMiddleware, roleMiddleware('admin'), platController.createPlat);  // Créer un plat
router.get('/dishes', platController.getPlats);  // Récupérer tous les plats
router.get('/dish/:id', platController.getPlatById);  // Récupérer un plat par ID
router.put('/dish/:id', authMiddleware, roleMiddleware('admin'), platController.updatePlat);  // Mettre à jour un plat
router.delete('/dish/:id', authMiddleware, roleMiddleware('admin'), platController.deletePlat);  // Supprimer un plat

// Routes pour les restaurants
router.post('/restaurants', authMiddleware, roleMiddleware('admin'), restaurantController.createRestaurant);  // Créer un restaurant
router.get('/restaurants', restaurantController.getRestaurants);  // Récupérer tous les restaurants
router.get('/restaurant/:id', restaurantController.getRestaurantById);  // Récupérer un restaurant par ID
router.put('/restaurant/:id', authMiddleware, roleMiddleware('admin'), restaurantController.updateRestaurant);  // Mettre à jour un restaurant
router.delete('/restaurant/:id', authMiddleware, roleMiddleware('admin'), restaurantController.deleteRestaurant);  // Supprimer un restaurant

// Routes pour les commandes
router.post('/orders', authMiddleware, commandeController.createCommande);  // Créer une commande
router.get('/orders', commandeController.getCommandes);  // Récupérer toutes les commandes
router.get('/order/:id', commandeController.getCommandeById);  // Récupérer une commande par ID
router.put('/order/:id', authMiddleware, commandeController.updateCommande);  // Mettre à jour une commande
router.delete('/order/:id', authMiddleware, commandeController.deleteCommande);  // Supprimer une commande

// Routes pour le panier
router.post('/cart', authMiddleware, panierController.addToPanier);  // Ajouter au panier
router.get('/cart/:userId', authMiddleware, panierController.getPanier);  // Récupérer le panier d'un utilisateur

module.exports = router;
