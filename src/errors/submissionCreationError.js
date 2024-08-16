
const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class SubmissionCreationError extends BaseError {
    constructor(details) {
        super('Not able to create submission', StatusCodes.BAD_REQUEST, details);
    }
}

module.exports = SubmissionCreationError;