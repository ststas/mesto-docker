const jwt = require('jsonwebtoken');
const HandleWrongCredentials = require('../errors/WrongCredentialsError');

const { NODE_ENV = 'preprod', JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    return next(new HandleWrongCredentials('Authorization is required'));
  }
  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'my-very-secret-key');
  } catch (err) {
    return next(new HandleWrongCredentials('Authorization is required'));
  }
  req.user = payload;
  return next();
};
