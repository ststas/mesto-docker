const { constants } = require('http2');

module.exports = class EmailIsRegisteredError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
};
