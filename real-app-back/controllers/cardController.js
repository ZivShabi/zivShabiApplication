const CardService = require('../services/cardService')
async function createCard(req, res) {
    try {
        req.body.userId = req.user._id
        const card = await CardService.createCard(req.body)
        res.status(201).json(card)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCards(req, res) {
    try {
        const userId = req.user.id
        const cards = await CardService.getCards(userId)
        if (!cards.length) {
            return res.status(404).json({ message: 'No cards found' })
        }
        res.status(200).json(cards)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCardById(req, res) {
    try {
        const cardId = req.params.id
        const card = await CardService.getCardById(cardId)
        if (!card) {
            return res.status(404).json({ message: 'Card not found' })
        }
        res.status(200).json(card)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getMyCards(req, res) {
    try {
        const userId = req.user.id
        const card = await CardService.getCardsByUserId(userId)
        if (!card) {
            return res.status(404).json({ message: 'Card not found' })
        }
        res.status(200).json(card)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function updateCard(req, res) {
    try {
        const card = await CardService.updateCard(req.params.id, req.body)
        if (!card) {
            return res.status(404).json({ message: 'Card not found' })
        }
        res.status(200).json(card)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function likeCard(req, res) {
    try {
        const cardId = req.params.id
        const userId = req.user._id
        const updatedCard = await CardService.likeCard(cardId, userId)
        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found or already liked' })
        }
        res.status(200).json(updatedCard)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function unlikeCard(req, res) {
    try {
        const cardId = req.params.id
        const userId = req.user._id
        const updatedCard = await CardService.unlikeCard(cardId, userId)
        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found or not liked yet' })
        }
        res.status(200).json(updatedCard)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



async function deleteCard(req, res) {
    try {
        const card = await CardService.deleteCard(req.params.id)
        if (!card) {
            return res.status(404).json({ message: 'Card not found' })
        }
        res.status(200).json({ message: 'Card deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    createCard, getCards, updateCard, deleteCard, getMyCards, likeCard,
    unlikeCard, getCardById
}
