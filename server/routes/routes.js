const express = require('express');
const router = express.Router();

// Importation des contr�leurs
const utilisateurController = require('../controllers/utilisateurController');
const platController = require('../controllers/platController');
const restaurantController = require('../controllers/restaurantController');
const commandeController = require('../controllers/commandeController');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validateMiddleware = require('../middleware/validateMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Routes d'authentification
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caract�res'),
        body('nom').notEmpty().withMessage('Le nom est obligatoire')
    ],
    validateMiddleware,
    authController.signup
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caract�res')
    ],
    validateMiddleware,
    authController.login
);

// Routes pour les utilisateurs (accessible uniquement aux admins)
router.post(
    '/users',
    authMiddleware,
    roleMiddleware('admin'),
    utilisateurController.createUtilisateur
);  // Cr�er un utilisateur

router.get(
    '/users',
    authMiddleware,
    roleMiddleware('admin'),
    utilisateurController.getUtilisateurs
); // R�cup�rer tous les utilisateurs

router.get(
    '/user',
    authMiddleware,
    utilisateurController.getUtilisateur
);  // R�cup�rer un utilisateur sp�cifique

router.put(
    '/user',
    authMiddleware,
    utilisateurController.updateUtilisateur
);  // Mettre � jour un utilisateur

router.delete(
    '/user',
    authMiddleware,
    roleMiddleware('admin'),
    utilisateurController.deleteUtilisateur
);  // Supprimer un utilisateur

// Routes pour les plats
router.post(
    '/restaurants/:restaurantId/dishes',
    authMiddleware,
    roleMiddleware('admin', 'restaurateur'),
    platController.createPlat
);  // Cr�er un plat

router.get(
    '/restaurants/:restaurantId/dishes',
    authMiddleware,
    platController.getPlatsByRestaurant
);  // R�cup�rer les plats d'un restaurant

router.get(
    '/dish/:id',
    authMiddleware,
    platController.getPlatDetails
);  // R�cup�rer un plat par ID

router.put(
    '/dish/:id',
    authMiddleware,
    roleMiddleware('admin', 'restaurateur'),
    platController.updatePlat
);  // Mettre � jour un plat

router.delete(
    '/dish/:id',
    authMiddleware,
    roleMiddleware('admin', 'restaurateur'),
    platController.deletePlat
);  // Supprimer un plat

// Routes pour les restaurants
router.post(
    '/restaurants',
    authMiddleware,
    roleMiddleware('admin'),
    restaurantController.createRestaurant
);  // Cr�er un restaurant

router.get(
    '/restaurants',
    authMiddleware,
    restaurantController.getAllRestaurants
);  // R�cup�rer tous les restaurants

router.get(
    '/restaurant/:id',
    authMiddleware,
    restaurantController.getRestaurantById
);  // R�cup�rer un restaurant par ID

router.get(
    '/restaurant/user/:userId',
    authMiddleware,
    roleMiddleware('restaurateur','admin'),
    restaurantController.getRestaurantByUserId
);


router.put(
    '/restaurant/:id',
    authMiddleware,
    roleMiddleware('admin', 'restaurateur'),
    restaurantController.updateRestaurant
);  // Mettre � jour un restaurant

router.delete(
    '/restaurant/:id',
    authMiddleware,
    roleMiddleware('admin'),
    restaurantController.deleteRestaurant
);  // Supprimer un restaurant

// Routes pour les commandes
router.post(
    '/orders',
    authMiddleware,
    commandeController.createCommande
);  // Cr�er une commande

router.get(
    '/orders',
    authMiddleware,
    commandeController.getCommandesByUser
);  // R�cup�rer toutes les commandes d'un utilisateur

router.get(
    '/order/:id',
    authMiddleware,
    commandeController.getCommandeById
);  // R�cup�rer une commande par ID

router.put(
    '/order/:id',
    authMiddleware,
    commandeController.updateCommandeStatus
);  // Mettre � jour le statut d'une commande

router.delete(
    '/order/:id',
    authMiddleware,
    commandeController.deleteCommande
);  // Supprimer une commande

module.exports = router;
