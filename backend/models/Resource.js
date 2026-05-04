const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  resourceId: String,
  name: String,
  workload: String
});

module.exports = mongoose.model("Resource", resourceSchema);