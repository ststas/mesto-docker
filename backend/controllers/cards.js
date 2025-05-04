const Card = require('../models/card');

const AccessDeniedError = require('../errors/AccessDeniedError');

module.exports.getCards = (req, res, next) => Card.find()
  .sort({ createdAt: -1 })
  .populate(['owner', 'likes'])
  .then((cards) => res.status(200).send(cards))
  .catch((err) => next(err));

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((updatedCard) => res.status(201).send(updatedCard))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .orFail()
    .then((deletedCard) => {
      if (req.user._id !== String(deletedCard.owner._id)) {
        return next(new AccessDeniedError('Access Denied'));
      }
      return deletedCard.deleteOne()
        .then((card) => res.status(200).send(card));
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail()
    .then((likedCard) => res.status(200).send(likedCard))
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail()
    .then((dislikedCard) => res.status(200).send(dislikedCard))
    .catch((err) => next(err));
};
