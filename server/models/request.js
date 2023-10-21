const Joi = require("joi");
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
    enum: ["Office365", "VSCode", "Node.js", "McAffee"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Denied"],
    default: "Pending",
  },
});

const Request = mongoose.model("Request", requestSchema);

function validatePostRequest(request) {
  const schema = Joi.object({
    email: Joi.string().required(),
    item: Joi.string()
      .required()
      .valid("Office365", "VSCode", "Node.js", "McAffee"),
    quantity: Joi.number(),
    reason: Joi.string().required(),
  });

  return schema.validate(request);
}

function validatePutRequest(request) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    status: Joi.string().valid("Pending", "Approved", "Denied").required(),
  });

  return schema.validate(request);
}

module.exports.Request = Request;
module.exports.validatePost = validatePostRequest;
module.exports.validatePut = validatePutRequest;
