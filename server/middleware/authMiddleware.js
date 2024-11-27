const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token manquant' });
    }

    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
        console.log("test")
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
