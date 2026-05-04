const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  workload: String,
  memberName: String,
  resourceName: String,
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker"
  },
  teamId: String,
  teamName: String
});

module.exports = mongoose.model("Event", eventSchema);