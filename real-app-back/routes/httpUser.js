

//../routes/httpUser.js
const express = require('express')
const crypto = require('crypto');
const router = express.Router()
const passport = require('passport')
UsersController = require('../controllers/usersController')
const authMiddleware = require('../middlewares/authMiddleware')
const { validateUser, validateRequest } = require('../validations/userValidation')
const { uploadImage } = require('../middlewares/fileUploadMulter')

router.post('/register', validateRequest(validateUser), UsersController.registerUser)
router.post('/login', validateRequest(validateUser), UsersController.loginUser)
router.patch('/changePassword', authMiddleware, UsersController.updatePassword)

router.get('/', authMiddleware, UsersController.getUsersToAdmin)
router.get('/:id', authMiddleware, UsersController.getUser)
router.put('/:id', authMiddleware, validateRequest(validateUser), UsersController.updateUser)
router.patch('/:id/biz-number', authMiddleware, UsersController.changeBizNumber)
router.delete('/:id', authMiddleware, UsersController.deleteUser)
router.patch('/updateImage/:id', authMiddleware, uploadImage, UsersController.updateUserImage)

router.get('/:id/friends', authMiddleware, UsersController.getFriendsList);


router.get('/auth/google', passport.authenticate('google'), (req, res, next) => {
    const state = crypto.randomBytes(16).toString('hex')
    const nonce = crypto.randomBytes(16).toString('hex')
    res.locals.state = state
    res.locals.nonce = nonce
    next()
})
module.exports = router



