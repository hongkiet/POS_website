const package = require('./package');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json(
            package(401, 'No token, authorization denied', null)
        );
    }

    jwt.verify(token, process.env.SESSION_KEY, (err, user) => {
        if (err) {
            return res.status(403).json(
                package(403, 'Access denied', null)
            );
        }
        req.user = user;
        next();
    });
};
