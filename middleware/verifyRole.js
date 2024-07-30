// middleware/verifyRole.js
const jwt = require('jsonwebtoken');

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).json({ error: 'Accès interdit' });

        jwt.verify(token, 'votre_clé_secrète', (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Accès interdit' });

            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ error: 'Accès interdit' });
            }

            req.user = decoded;
            next();
        });
    };
};

module.exports = verifyRole;
