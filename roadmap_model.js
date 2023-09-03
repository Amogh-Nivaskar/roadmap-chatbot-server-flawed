const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoadMapSchema = new Schema({
  topic: { type: String },
  steps: [
    {
      type: String,
    },
  ],
  prerequisites: [
    {
      type: String,
    },
  ],
  resources: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Roadmap", RoadMapSchema);
