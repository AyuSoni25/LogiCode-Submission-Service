const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");

function evaluationWorker(queueName) {
  new Worker(
    queueName,
    async (job) => {
      if (job.name === 'EvaluationJob') {
        try {
            //TODO: Add logic to update submission status in db

            //notifying web socket service about the completion of evaluation
            const response = await axios.post('http://localhost:3000/sendPayload', {
                userId: job.data.userId,
                payload: job.data
            });
            console.log(response);
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
