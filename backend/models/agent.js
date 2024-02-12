const mongoose = require("mongoose");
const YAML = require("js-yaml");
var validator = require("validator");

var AgentSchema = mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Agent Id cannot be empty"],
    unique: [true, "Agent Id must be unique"], // If you want to enforce uniqueness for your custom _id
  },
  agentToken: {
    type: String,
    required: [true, "Agent Token cannot be empty"],
  },
  authToken: {
    type: String,
    required: [true, "Agent Auth Token cannot be empty"],
  },
  apiKey: {
    type: String,
    required: [true, "API key cannot be empty"],
  },
  agentYaml: {
    type: String,
    required: [true, "API key cannot be empty"],
    validate: {
      validator: function (value) {
        try {
          // Attempt to parse the YAML
          YAML.load(value);
          return true; // Validation succeeds if parsing is successful
        } catch (error) {
          return false; // Validation fails if there's an error during parsing
        }
      },
      message: (props) => `${props.value} is not a valid YAML format`,
    },
  },
  agentAdd: {
    type: String,
    validate: {
      validator: (value) =>
        validator.isURL(value, {
          protocols: ["http", "https", "ftp"],
          require_tld: true,
          require_protocol: true,
        }),
      message: "Agent Adress must be a Valid URL",
    },
    required: [true, "Agent Adress cannot be empty"],
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

let Agent;

if (!mongoose.models["Agent"]) {
  Agent = mongoose.model("Agent", AgentSchema);
} else {
  Agent = mongoose.models["Agent"];
}
module.exports = Agent;
