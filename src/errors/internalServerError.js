
const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class InternalServerError extends BaseError {
    constructor(details) {
        super("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR, `something went wrong!`, details);
    }
}

module.exports = InternalServerError;