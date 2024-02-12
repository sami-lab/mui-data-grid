const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const AgentEndPoints = require("../models/endpoints");

//to check agent server is on
exports.getAgentStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Connected",
  });
});

//Get all agents endpoints
exports.getAgentEndpoints = catchAsync(async (req, res, next) => {
  const doc = await AgentEndPoints.find({
    agentId: process.env.agentId,
  }).sort({ createdOn: "descending" });

  res.status(200).json({
    success: true,
    result: doc.length,
    data: { doc },
  });
});

//to update status of endpoint
exports.updateEndPointStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const doc = await AgentEndPoints.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!doc) {
    return next(new AppError("Agent endpoint not updated", 404));
  }
  res.status(200).json({
    success: true,
    data: {
      doc,
    },
  });
});

//to check endpoint is live
exports.getEndpointStatus = catchAsync(async (req, res, next) => {
  const { endPointaddr } = req.params;
  const doc = await AgentEndPoints.find({
    endPointaddr,
    agentId: process.env.agentId,
  }).sort({ createdOn: "descending" });

  res.status(200).json({
    success: true,
    message: "Connected",
  });
});

//to update endpoints of agent
exports.updateEndpoint = catchAsync(async (req, res, next) => {
  const { name, proto, endPointaddr, crt, key } = req.body;

  if (proto === "tls") {
    if (crt === undefined || key === undefined) {
      return next(new AppError("crt or key cannot be empty for tls", 422));
    }
  }

  const doc = await AgentEndPoints.findByIdAndUpdate(
    req.params.id,
    { name, proto, endPointaddr, crt, key },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!doc) {
    return next(new AppError("Agent endpoints not updated", 404));
  }
  res.status(200).json({
    success: true,
    data: {
      doc,
    },
  });
});

//to create new endpoint
exports.createEndpoint = catchAsync(async (req, res, next) => {
  const { id, name, proto, endPointaddr, crt, key } = req.body;

  if (proto === "tls") {
    if (crt === undefined || key === undefined) {
      return next(new AppError("crt or key cannot be empty for tls", 422));
    }
  }

  const doc = await AgentEndPoints.create({
    _id: id,
    agentId: process.env.agentId,
    name,
    proto,
    endPointaddr,
    crt,
    key,
  });
  if (!doc) return next(new AppError("Something went wrong", 500));

  res.status(201).json({
    success: true,
    data: {
      doc,
    },
  });
});

//to delete endpoint
exports.deleteEndpoint = catchAsync(async (req, res, next) => {
  const doc = await AgentEndPoints.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("Requested Endpoint not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "deleted Successfully",
  });
});

//this is to delete endpoints on agent
exports.deleteAgentEndpoints = catchAsync(async (req, res, next) => {
  const doc = await AgentEndPoints.deleteMany({
    agentId: process.env.agentId,
  });
  if (!doc) {
    return next(new AppError("Requested Endpoint not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "deleted Successfully",
  });
});
exports.getOne = catchAsync(async (req, res, next) => {
  //Tour.find({_id:req.params.id})
  let doc = await AgentEndPoints.findById(req.params.id);
  if (!doc) {
    return next(new AppError("Requested Endpoint not found", 404));
  }
  res.status(200).json({
    success: true,
    data: { doc },
  });
});
exports.getAll = catchAsync(async (req, res, next) => {
  const doc = await AgentEndPoints.find().sort({ createdOn: "descending" });

  res.status(200).json({
    success: true,
    result: doc.length,
    data: { doc },
  });
});
