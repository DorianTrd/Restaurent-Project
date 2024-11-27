const { body, validationResult } = require('express-validator');

// Validator pour la cr�ation d'un restaurant
const validateRestaurant = [
    body('nom').notEmpty().withMessage('Le nom du restaurant est requis'),  // V�rifie que le nom n'est pas vide
    body('adresse').notEmpty().withMessage('L\'adresse est requise'),  // V�rifie que l'adresse n'est pas vide
    body('codePostal').notEmpty().withMessage('Le code postal est requis')
        .isPostalCode('FR').withMessage('Le code postal doit �tre valide en France'), // V�rifie le code postal pour la France
    body('ville').notEmpty().withMessage('La ville est requise'),  // V�rifie que la ville n'est pas vide
    body('email').isEmail().withMessage('L\'email est invalide')  // V�rifie que l'email est valide
        .normalizeEmail(),  // Normalise l'email pour �viter les diff�rences de casse
    body('motDePasse')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caract�res') // V�rifie que le mot de passe a une longueur minimale
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
