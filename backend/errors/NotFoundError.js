const { constants } = require('http2');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
};
