const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constant')

const AuthMiddleWare = (req, res, next) => {
    const token = req.headers['x-http-token'];
    if (!token) {
        res.send({
            statusCode: 1,
            message: "Authentication failed, No Token"
        })
        return
    }
    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) {
            res.send({
                statusCode: 1,
                message: 'Authentication failed',
                error: err
            })
            return
        }
        req.email = decode.email;
        next();
    })
}

module.exports = AuthMiddleWare;
