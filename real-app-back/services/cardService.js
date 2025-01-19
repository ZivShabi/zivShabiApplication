
const Card = require('../models/card')

async function createCard(cardData) {
    const card = new Card(cardData)
    return await card.save()
}

async function getCards() { return await Card.find() }


async function getCardById(cardId) {
    return await Card.findById(cardId).populate('userId');
}


async function getCardsByUserId(userId) {
    return await Card.find({ userId })
}

async function updateCard(id, cardData) {
    return await Card.findByIdAndUpdate(id, cardData, { new: true })
}

async function likeCard(cardId, userId) {
    return await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: userId } },
        { new: true }
    );
}

async function unlikeCard(cardId, userId) {
    return await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true }
    );
}


async function deleteCard(id) { return await Card.findByIdAndDelete(id) }

module.exports = {
    createCard, getCards, updateCard, deleteCard, getCardsByUserId, likeCard,
    unlikeCard, getCardById
}


