const roleMiddleware = (role) => (req, res, next) => {
    if (req.user.role !== role && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé. Rôle insuffisant' });
    }
    next();
};

module.exports = roleMiddleware;
