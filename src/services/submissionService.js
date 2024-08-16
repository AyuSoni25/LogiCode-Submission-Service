const submissionQueueProducer = require("../producers/submissionQueueProducer")

class SubmissionService {
    constructor(submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    async pingCheck() {
        return 'pong'
    }

    async addSubmission(submission) {
        const submission = this.submissionRepository.createSubmission(submission);
        if(!submission){
            //TODO : Add error handling here
            throw {
                message: 'Not able to create submission'
            }
        }
        console.log(submission);
        const response = await submissionQueueProducer(submission);
        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService