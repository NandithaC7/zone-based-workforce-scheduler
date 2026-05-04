const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  workerId: String,
  teamId: String,
  name: String
});

module.exports = mongoose.model("Worker", workerSchema);