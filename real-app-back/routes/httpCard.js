
const express = require('express')
const router = express.Router()
const CardController = require('../controllers/cardController')
const authMiddleware = require('../middlewares/authMiddleware')
const { validateCard, validateRequest } = require('../validations/cardValidation')

router.post('/', authMiddleware, validateRequest(validateCard), CardController.createCard)
router.get('/', authMiddleware, CardController.getCards)
router.get('/mycards', authMiddleware, CardController.getMyCards)
router.get('/:id', authMiddleware, CardController.getCardById)
router.put('/:id', authMiddleware, validateRequest(validateCard), CardController.updateCard)
router.post('/:id/like', authMiddleware, CardController.likeCard);
router.delete('/:id/unlike', authMiddleware, CardController.unlikeCard);
router.delete('/:id', authMiddleware, CardController.deleteCard)

module.exports = router
