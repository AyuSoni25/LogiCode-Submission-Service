const SubmissionCreationError = require("../errors/submissionCreationError");
const submissionQueueProducer = require("../producers/submissionQueueProducer")

class SubmissionService {
    constructor(submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    async pingCheck() {
        return 'pong'
    }

    async addSubmission(submissionPayload) {
        const submission = await this.submissionRepository.createSubmission(submissionPayload);
        if(!submission){
            throw new SubmissionCreationError('Failed to create a submission')
        }
        const response = await submissionQueueProducer(submission);
        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService