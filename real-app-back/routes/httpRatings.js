const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const RatingsController = require('../controllers/ratingsController')

// Add a new rating
router.post('/', authMiddleware, RatingsController.addRating)

// Get average rating
router.get('/', RatingsController.getAverageRating)

module.exports = router
