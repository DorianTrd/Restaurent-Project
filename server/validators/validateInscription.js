const { body, validationResult } = require('express-validator');

// Validator pour l'inscription d'un utilisateur
const validateInscription = [
    body('email').isEmail().withMessage('Email invalide'),  // V�rifie que l'email est valide
    body('motDePasse')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caract�res') // Minimum 6 caract�res
        .matches(/[0-9]/).withMessage('Le mot de passe doit contenir au moins un chiffre')  // Doit contenir un chiffre
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule'),  // Doit contenir une majuscule
    body('nom')
        .notEmpty().withMessage('Le nom est requis'),  // V�rifie que le nom n'est pas vide
    body('prenom')
        .notEmpty().withMessage('Le pr�nom est requis'),  // V�rifie que le pr�nom n'est pas vide
    (req, res, next) => {
        // Si des erreurs sont pr�sentes, renvoie une r�ponse avec les erreurs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateInscription };
