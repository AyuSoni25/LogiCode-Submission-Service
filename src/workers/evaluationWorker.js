const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");
const axios = require("axios");
const SubmissionService = require("../services/submissionService");
const SubmissionRepository = require("../repositories/submissionRepository");


function evaluationWorker(queueName) {

  const submissionService = new SubmissionService(new SubmissionRepository());

  new Worker(
    queueName,
    async (job) => {
      if (job.name === 'EvaluationJob') {
        try {
            //TODO: Add logic to update submission status in db

            //notifying web socket service about the completion of evaluation
            console.log(job.data.userId);
            console.log(job.data);
            const response = await axios.post('http://localhost:3001/sendPayload', {
                userId: job.data.userId,
                payload: job.data
            });
            const updatedSubmission = await submissionService.updateStatusOfSubmission(job.data.submissionId, job.data.response.status);
            console.log(response);
            console.log(updatedSubmission);
        } catch (error) {
            console.log(error);
        }
      }
    },
    {
      connection: redisConnection,
    }
  );
}

module.exports = evaluationWorker;
