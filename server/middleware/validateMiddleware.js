const { validationResult, body } = require('express-validator');

// Middleware de validation pour cr�er un utilisateur
const validateUtilisateur = [
    body('nom')
        .notEmpty()
        .withMessage('Le nom est requis')
        .isLength({ min: 3 })
        .withMessage('Le nom doit comporter au moins 3 caract�res'),
    body('email')
        .isEmail()
        .withMessage('L\'email doit �tre valide')
        .notEmpty()
        .withMessage('L\'email est requis'),
    body('motDePasse')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit comporter au moins 6 caract�res')
        .notEmpty()
        .withMessage('Le mot de passe est requis'),

    // Fonction de traitement des erreurs
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUtilisateur };
