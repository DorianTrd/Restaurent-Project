const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const restaurantController = require('../controllers/restaurantController');
const platController = require('../controllers/platController');
const commandeController = require('../controllers/commandeController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Routes Utilisateur
router.post('/utilisateur', utilisateurController.createUtilisateur);
router.get('/utilisateur', authMiddleware, utilisateurController.getUtilisateur);
router.put('/utilisateur', authMiddleware, utilisateurController.updateUtilisateur);
router.delete('/utilisateur', authMiddleware, utilisateurController.deleteUtilisateur);

// Routes Restaurant (admin seulement)
router.post('/restaurants', authMiddleware, roleMiddleware(['admin']), restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.put('/restaurants/:id', authMiddleware, roleMiddleware(['admin']), restaurantController.updateRestaurant);
router.delete('/restaurants/:id', authMiddleware, roleMiddleware(['admin']), restaurantController.deleteRestaurant);

// Routes Plat (admin seulement)
router.post('/plats', authMiddleware, roleMiddleware(['admin']), platController.createPlat);
router.get('/plats', platController.getPlats);
router.get('/plats/:id', platController.getPlatById);
router.put('/plats/:id', authMiddleware, roleMiddleware(['admin']), platController.updatePlat);
router.delete('/plats/:id', authMiddleware, roleMiddleware(['admin']), platController.deletePlat);

// Routes Commande (utilisateur authentifié)
router.post('/commandes', authMiddleware, commandeController.createCommande);
router.get('/commandes', authMiddleware, commandeController.getCommandes);
router.get('/commandes/:id', authMiddleware, commandeController.getCommandeById);
router.put('/commandes/:id', authMiddleware, commandeController.updateCommande);
router.delete('/commandes/:id', authMiddleware, commandeController.deleteCommande);

module.exports = router;
