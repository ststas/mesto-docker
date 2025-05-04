const { constants } = require('http2');
const { default: mongoose } = require('mongoose');

function handleErrors(err, req, res, next) {
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: err.message });
  } else {
    const { statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
    res.status(statusCode).json({ message: statusCode === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message });
    next();
  }
}

module.exports = { handleErrors };
