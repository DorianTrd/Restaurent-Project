const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models/Utilisateur');

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.SECRET_KEY,async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
        const user = await Utilisateur.findOne({
            where: {
                id : decoded.id
            }
        })
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
