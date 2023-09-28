const jwtPromises = require('../lib/jwt.js');
const { SECRET } = require('../config/config.js')

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const user = await jwtPromises.verify(token, SECRET);
            req.user = user // Adding information for the user for all actions afterwards.
            next();
        } catch (err) {
            res.clearCookie('auth');
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};