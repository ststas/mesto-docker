const NotFoundError = require('../errors/NotFoundError');

function handleRouteError(err, res, next) {
  return next(new NotFoundError('Page Not Found'));
}

module.exports = {
  handleRouteError,
};
