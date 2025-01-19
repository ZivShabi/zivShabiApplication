const RatingService = require('../services/ratingService')

async function addRating(req, res) {
    try {
        const { rating } = req.body

        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' })
        }

        await RatingService.addRating(req.user._id, rating) // Associate rating with logged-in user
        res.status(201).json({ message: 'Rating added successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getAverageRating(req, res) {
    try {
        const averageRating = await RatingService.getAverageRating()
        res.status(200).json({ averageRating })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addRating, getAverageRating }
