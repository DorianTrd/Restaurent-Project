const express = require('express');
const router = express.Router();

// Importation des contr�leurs
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
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caract�res'),
        body('nom').notEmpty().withMessage('Le nom est obligatoire')
    ],
    validateMiddleware,  // Applique le middleware de validation
    authController.signup // Appelle la m�thode signup du contr�leur
);

router.post(
    '/login',
    [
        // Validation des champs de connexion
        body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caract�res')
    ],
    validateMiddleware,  // Applique le middleware de validation
    authController.login // Appelle la m�thode login du contr�leur
);

// Routes pour les utilisateurs (accessible uniquement aux admins)
router.post('/users', authMiddleware, roleMiddleware('admin'), utilisateurController.createUtilisateur);  // Cr�er un utilisateur
router.get('/users', authMiddleware, roleMiddleware('admin'), utilisateurController.getUtilisateurs); // R�cup�rer tous les utilisateurs
router.get('/user', authMiddleware, utilisateurController.getUtilisateur);  // R�cup�rer un utilisateur sp�cifique
router.put('/user', authMiddleware, utilisateurController.updateUtilisateur);  // Mettre � jour un utilisateur
router.delete('/user', authMiddleware, roleMiddleware('admin'), utilisateurController.deleteUtilisateur);  // Supprimer un utilisateur

// Routes pour les plats
router.post('/dishes', authMiddleware, roleMiddleware('admin'), platController.createPlat);  // Cr�er un plat
router.get('/dishes', platController.getPlats);  // R�cup�rer tous les plats
router.get('/dish/:id', platController.getPlatById);  // R�cup�rer un plat par ID
router.put('/dish/:id', authMiddleware, roleMiddleware('admin'), platController.updatePlat);  // Mettre � jour un plat
router.delete('/dish/:id', authMiddleware, roleMiddleware('admin'), platController.deletePlat);  // Supprimer un plat

// Routes pour les restaurants
router.post('/restaurants', authMiddleware, roleMiddleware('admin'), restaurantController.createRestaurant);  // Cr�er un restaurant
router.get('/restaurants', restaurantController.getRestaurants);  // R�cup�rer tous les restaurants
router.get('/restaurant/:id', restaurantController.getRestaurantById);  // R�cup�rer un restaurant par ID
router.put('/restaurant/:id', authMiddleware, roleMiddleware('admin'), restaurantController.updateRestaurant);  // Mettre � jour un restaurant
router.delete('/restaurant/:id', authMiddleware, roleMiddleware('admin'), restaurantController.deleteRestaurant);  // Supprimer un restaurant

// Routes pour les commandes
router.post('/orders', authMiddleware, commandeController.createCommande);  // Cr�er une commande
router.get('/orders', commandeController.getCommandes);  // R�cup�rer toutes les commandes
router.get('/order/:id', commandeController.getCommandeById);  // R�cup�rer une commande par ID
router.put('/order/:id', authMiddleware, commandeController.updateCommande);  // Mettre � jour une commande
router.delete('/order/:id', authMiddleware, commandeController.deleteCommande);  // Supprimer une commande

// Routes pour le panier
router.post('/cart', authMiddleware, panierController.addToPanier);  // Ajouter au panier
router.get('/cart/:userId', authMiddleware, panierController.getPanier);  // R�cup�rer le panier d'un utilisateur

module.exports = router;
