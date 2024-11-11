const fetchProblemDetails = require("../apis/problemAdminApi");
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
        // hit the problem admin service and fetch the problem details
        const problemId = submissionPayload.problemId;
        const userId = submissionPayload.userId;

        const problemAdminApiResponse = await fetchProblemDetails(problemId);
        
        if(!problemAdminApiResponse){
            throw new SubmissionCreationError('Failed to create a submission')
        }

        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submissionPayload.language.toLowerCase());
        submissionPayload.code = languageCodeStub.startSnippet + '\n\n' + submissionPayload.code + '\n\n' + languageCodeStub.endSnippet;

        // we are going to create the entry in db
        const submission = await this.submissionRepository.createSubmission(submissionPayload);
        if(!submission){
            throw new SubmissionCreationError('Failed to create a submission')
        }
        const response = await submissionQueueProducer({
            [submission._id]: {
            code: submission.code,
            language: submission.language,
            inputCase: problemAdminApiResponse.data.testCases[0].input,
            outputCase: problemAdminApiResponse.data.testCases[0].output,
            userId,
            submissionId: submission._id
            }
        });

        //TODO: add handling of all test cases here
        return {queueResponse: response, submission};
    }

    async updateStatusOfSubmission(submissionId, status) {
        const response = await this.submissionRepository.updateStatusOfSubmission(submissionId, status);
        return response;
    }
}

module.exports = SubmissionService