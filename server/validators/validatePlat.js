const { body, validationResult } = require('express-validator');

// Validator pour la création d'un plat
const validatePlat = [
    body('nom').notEmpty().withMessage('Le nom du plat est requis'),  // Vérifie que le nom n'est pas vide
    body('prix')
        .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif')  // Vérifie que le prix est un nombre positif
        .notEmpty().withMessage('Le prix est requis'),  // Vérifie que le prix n'est pas vide
    body('description').notEmpty().withMessage('La description est requise'),  // Vérifie que la description n'est pas vide
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validatePlat };
