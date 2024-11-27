const { body, validationResult } = require('express-validator');

// Validator pour la mise à jour des informations de l'utilisateur
const validateUpdateUser = [
    body('email')
        .optional()  // L'email est optionnel, mais s'il est fourni, il doit être valide
        .isEmail().withMessage('Email invalide'),
    body('motDePasse')
        .optional()  // Le mot de passe est optionnel, mais s'il est fourni, il doit être valide
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUpdateUser };
