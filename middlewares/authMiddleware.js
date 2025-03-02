//esto es bonus
const admin = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.redirect('/login');
    }
};

module.exports = authMiddleware;
