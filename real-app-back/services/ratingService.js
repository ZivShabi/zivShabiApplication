const Rating = require('../models/rating')

async function addRating(userId, ratingValue) {
    const rating = new Rating({ user: userId, value: ratingValue })
    await rating.save()
}

async function getAverageRating() {
    const ratings = await Rating.find()
    if (ratings.length === 0) return 0

    const total = ratings.reduce((sum, rating) => sum + rating.value, 0)
    return (total / ratings.length).toFixed(2)
}

module.exports = { addRating, getAverageRating }
