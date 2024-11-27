const { body, validationResult } = require('express-validator');

// Validator pour la création d'un restaurant
const validateRestaurant = [
    body('nom').notEmpty().withMessage('Le nom du restaurant est requis'),  // Vérifie que le nom n'est pas vide
    body('adresse').notEmpty().withMessage('L\'adresse est requise'),  // Vérifie que l'adresse n'est pas vide
    body('codePostal').notEmpty().withMessage('Le code postal est requis')
        .isPostalCode('FR').withMessage('Le code postal doit être valide en France'), // Vérifie le code postal pour la France
    body('ville').notEmpty().withMessage('La ville est requise'),  // Vérifie que la ville n'est pas vide
    body('email').isEmail().withMessage('L\'email est invalide')  // Vérifie que l'email est valide
        .normalizeEmail(),  // Normalise l'email pour éviter les différences de casse
    body('motDePasse')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères') // Vérifie que le mot de passe a une longueur minimale
        .matches(/[0-9]/).withMessage('Le mot de passe doit contenir au moins un chiffre')  // Doit contenir un chiffre
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule'),  // Doit contenir une majuscule
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateRestaurant };
