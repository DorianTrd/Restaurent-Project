const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

// Middleware pour v�rifier si l'utilisateur est authentifi�
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: 'Token non fourni, acc�s interdit' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Ajouter les informations de l'utilisateur au request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide ou expir�' });
    }
};

module.exports = authMiddleware;
