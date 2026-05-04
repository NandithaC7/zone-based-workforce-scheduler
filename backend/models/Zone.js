const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  zoneId: String,
  name: String
});

module.exports = mongoose.model("Zone", zoneSchema);