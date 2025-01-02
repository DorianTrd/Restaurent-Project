const roleMiddleware = (role) => (req, res, next) => {
    if (req.user.role !== role && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acc�s refus�. R�le insuffisant' });
    }
    next();
};

module.exports = roleMiddleware;
