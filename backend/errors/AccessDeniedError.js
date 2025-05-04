const { constants } = require('http2');

module.exports = class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
};
