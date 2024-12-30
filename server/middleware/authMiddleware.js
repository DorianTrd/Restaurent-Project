const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models/Utilisateur');

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];

    // Si le token n'est pas présent dans l'en-tête
    if (!token) {
        return res.status(403).json({ message: 'Token manquant' });
    }

    // Vérification du token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        try {
            // Recherche de l'utilisateur dans la base de données
            const user = await Utilisateur.findOne({
                where: {
                    id: decoded.id
                }
            });

            // Si l'utilisateur n'est pas trouvé
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }


            req.user = user;


            next();
        } catch (dbError) {
            // Si une erreur se produit lors de la recherche dans la base de données
            console.error('Erreur de base de données:', dbError);
            return res.status(500).json({ message: 'Erreur serveur interne' });
        }
    });
};

module.exports = authMiddleware;
