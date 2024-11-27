// Middleware pour vérifier le rôle de l'utilisateur
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        // Assurez-vous que req.user existe, cela nécessite d'être passé par authMiddleware
        if (!req.user) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        // Vérifier si l'utilisateur a le rôle requis
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès interdit pour ce rôle' });
        }

        next();
    };
};

module.exports = roleMiddleware;
