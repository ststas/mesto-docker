const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const WrongCredentialsError = require('../errors/WrongCredentialsError');
const EmailIsRegisteredError = require('../errors/EmailIsRegisteredError');

const { NODE_ENV = 'preprod', JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => res.status(201).send({
        email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
      })))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new EmailIsRegisteredError('Email is Already Registered'));
      } return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new WrongCredentialsError('Wrong email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new WrongCredentialsError('Wrong email or password'));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'my-very-secret-key', {
            expiresIn: '7d',
          });
          res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          return res.status(200).json({ _id: user._id });
        });
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).send({ message: 'User Is Logged Out' });
};

module.exports.getUsers = (req, res, next) => User.find()
  .then((users) => res.status(200).send(users))
  .catch((err) => next(err));

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  if (userId.length === 24) {
    return User.findById(userId)
      .orFail()
      .then((user) => res.status(200).send(user))
      .catch((err) => next(err));
  } return next(new WrongCredentialsError(`Invalid User ID: ${userId}. User ID must contain 24 symbols`));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => next(err));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => next(err));
};
