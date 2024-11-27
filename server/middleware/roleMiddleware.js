// Middleware pour v�rifier le r�le de l'utilisateur
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        // Assurez-vous que req.user existe, cela n�cessite d'�tre pass� par authMiddleware
        if (!req.user) {
            return res.status(403).json({ message: 'Acc�s interdit' });
        }

        // V�rifier si l'utilisateur a le r�le requis
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acc�s interdit pour ce r�le' });
        }

        next();
    };
};

module.exports = roleMiddleware;
