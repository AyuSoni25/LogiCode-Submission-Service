const Submission = require("../models/submissionModel");

class SubmissionRepository {
    constructor(){
        this.submissionModel = Submission;
    }

    async createSubmission(submission){
        const response = await this.submissionModel.create(submission);
        return response;
    }

    async updateStatusOfSubmission(submissionId, status){
        try {
            const filter = {_id: submissionId};
            const update = {status: status}
            const updatedSubmission = await this.submissionModel.findOneAndUpdate(filter, update, {
                new: true
            });
            return updatedSubmission;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = SubmissionRepository;