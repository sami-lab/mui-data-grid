const mongoose = require("mongoose");

var AgentEndPointsSchema = mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Agent endpoint cannot be empty"],
    unique: [true, "Agent endpoint must be unique"], // If you want to enforce uniqueness for your custom _id
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Agent Endpoint name cannot be empty"],
  },
  status: {
    type: String,
    required: [true, "Agent endpoint status cannot be empty"],
    enum: ["started", "stopped"],
    default: "started",
  },
  name: {
    type: String,
    required: [true, "Agent Endpoint name cannot be empty"],
  },
  proto: {
    type: String,
    enum: ["http", "tls", "tcp"],
    required: [true, "Agent endpoint protocol cannot be empty"],
  },
  endPointaddr: {
    type: String,
    required: [true, "Endpoint Add cannot be empty"],
  },
  crt: {
    type: String,
  },
  key: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: {
    type: Date,
    default: Date.now(),
  },
});

let AgentEndPoints;

if (!mongoose.models["AgentEndPoints"]) {
  AgentEndPoints = mongoose.model("AgentEndPoints", AgentEndPointsSchema);
} else {
  AgentEndPoints = mongoose.models["AgentEndPoints"];
}
module.exports = AgentEndPoints;
