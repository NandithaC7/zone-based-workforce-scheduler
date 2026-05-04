const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamId: String,
  zoneId: String,
  name: String
});

module.exports = mongoose.model("Team", teamSchema);