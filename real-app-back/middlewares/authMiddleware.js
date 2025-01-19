

const jwt = require('jsonwebtoken')
const config = require('config')

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
    if (!token) {
        return res.status(401).json({
            message: 'Authorization denied. No token provided'
        })
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtKey'))
        req.user = { id: decoded._id, ...decoded };

        // req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' })
    }
}

module.exports = authMiddleware
