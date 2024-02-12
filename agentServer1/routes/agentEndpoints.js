const express = require("express");
const agentEndpointController = require("../controllers/agentEndpointController");

const router = express.Router();

router.route("/").get(agentEndpointController.getAgentStatus);

router.route("/getAll").get(agentEndpointController.getAgentEndpoints);
router.route("/create").post(agentEndpointController.createEndpoint);
router.route("/update/:id").patch(agentEndpointController.updateEndpoint);
router.route("/delete/:id").delete(agentEndpointController.deleteEndpoint);

router
  .route("/updateStatus/:id")
  .patch(agentEndpointController.updateEndPointStatus);
router.route("/:endPointaddr").get(agentEndpointController.getEndpointStatus);

module.exports = router;
