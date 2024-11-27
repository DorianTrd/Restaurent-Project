const { body, validationResult } = require('express-validator');

// Validator pour la commande
const validateCommande = [
    body('plats')
        .isArray().withMessage('Les plats doivent être un tableau')  // Vérifie que la commande contient bien des plats sous forme de tableau
        .notEmpty().withMessage('La commande ne peut pas être vide'),  // Vérifie que la commande n'est pas vide
    body('utilisateurId').isInt().withMessage('L\'ID utilisateur est requis et doit être un entier'),  // Vérifie que l'ID utilisateur est un entier
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateCommande };
