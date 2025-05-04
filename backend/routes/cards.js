const router = require('express').Router();
const {
  validateCardCreation,
  validateCardRemoval,
  validateCardLike,
  validateCardDislike,
} = require('../middlewares/validation');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardCreation(), createCard);
router.delete('/:cardId', validateCardRemoval(), deleteCard);
router.put('/:cardId/likes', validateCardLike(), likeCard);
router.delete('/:cardId/likes', validateCardDislike(), dislikeCard);

module.exports = router;
