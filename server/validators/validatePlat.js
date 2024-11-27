const { body, validationResult } = require('express-validator');

// Validator pour la cr�ation d'un plat
const validatePlat = [
    body('nom').notEmpty().withMessage('Le nom du plat est requis'),  // V�rifie que le nom n'est pas vide
    body('prix')
        .isFloat({ min: 0 }).withMessage('Le prix doit �tre un nombre positif')  // V�rifie que le prix est un nombre positif
        .notEmpty().withMessage('Le prix est requis'),  // V�rifie que le prix n'est pas vide
    body('description').notEmpty().withMessage('La description est requise'),  // V�rifie que la description n'est pas vide
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validatePlat };
