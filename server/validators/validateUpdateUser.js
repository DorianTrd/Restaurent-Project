const { body, validationResult } = require('express-validator');

// Validator pour la mise � jour des informations de l'utilisateur
const validateUpdateUser = [
    body('email')
        .optional()  // L'email est optionnel, mais s'il est fourni, il doit �tre valide
        .isEmail().withMessage('Email invalide'),
    body('motDePasse')
        .optional()  // Le mot de passe est optionnel, mais s'il est fourni, il doit �tre valide
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caract�res'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUpdateUser };
