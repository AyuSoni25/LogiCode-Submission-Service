const submissionController = require('../../../controllers/submissionController');

async function submissionRoute(fastify, options){
    fastify.get('/ping', submissionController.pingRequest)
    fastify.get('/', submissionController.createSubmission)
}

module.exports = submissionRoute;