const express = require('express');
const router = express.Router();

// Importation des contrôleurs
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
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').notEmpty().withMessage('Le nom est obligatoire')
    ],
    validateMiddleware,
    authController.signup
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
        body('motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
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
);  // Créer un utilisateur

router.get(
    '/users',
    authMiddleware,
    roleMiddleware('admin'),
    utilisateurController.getUtilisateurs
); // Récupérer tous les utilisateurs

router.get(
    '/user',
    authMiddleware,
    utilisateurController.getUtilisateur
);  // Récupérer un utilisateur spécifique

router.put(
    '/user',
    authMiddleware,
    utilisateurController.updateUtilisateur
);  // Mettre à jour un utilisateur

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
);  // Créer un plat

router.get(
    '/restaurants/:restaurantId/dishes',
    authMiddleware,
    platController.getPlatsByRestaurant
);  // Récupérer les plats d'un restaurant

router.get(
    '/dish/:id',
    authMiddleware,
    platController.getPlatDetails
);  // Récupérer un plat par ID

router.put(
    '/dish/:id',
    authMiddleware,
    roleMiddleware('admin', 'restaurateur'),
    platController.updatePlat
);  // Mettre à jour un plat

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
);  // Créer un restaurant

router.get(
    '/restaurants',
    authMiddleware,
    restaurantController.getAllRestaurants
);  // Récupérer tous les restaurants

router.get(
    '/restaurant/:id',
    authMiddleware,
    restaurantController.getRestaurantById
);  // Récupérer un restaurant par ID

router.put(
    '/restaurant/:id',
    authMiddleware,
    roleMiddleware('admin', 'restaurateur'),
    restaurantController.updateRestaurant
);  // Mettre à jour un restaurant

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
);  // Créer une commande

router.get(
    '/orders',
    authMiddleware,
    commandeController.getCommandesByUser
);  // Récupérer toutes les commandes d'un utilisateur

router.get(
    '/order/:id',
    authMiddleware,
    commandeController.getCommandeById
);  // Récupérer une commande par ID

router.put(
    '/order/:id',
    authMiddleware,
    commandeController.updateCommandeStatus
);  // Mettre à jour le statut d'une commande

router.delete(
    '/order/:id',
    authMiddleware,
    commandeController.deleteCommande
);  // Supprimer une commande

module.exports = router;
