const submissionQueue = require("../queues/submissionQueue");

module.exports = async function (name, payload) {
  await submissionQueue.add(name, payload);
  console.log('Successfully added a new submission job.')
}
