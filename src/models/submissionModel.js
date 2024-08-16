const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    userId: {
        type: String,
        requires: [true, 'User id for the submission is missing'],
    },
    problemId: {
        type: String,
        requires: [true, 'Problem id for the submission is missing'],
    },
    code: {
        type: String,
        requires: [true, 'Code for the submission is missing'],
    },
    language: {
        type: String,
        requires: [true, 'Language for the submission is missing'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Success', 'TLE', 'MLE', 'RE', 'WA'],
        default: 'Pending'
    }
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;