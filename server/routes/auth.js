const { User } = require("../models/user");
const Joi = require("joi");
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/me", async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "-password"
  );
  res.send(user);
});

router.post("/", async (req, res) => {
  // API req format validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if user doesnt exist, invalid credentials
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid credentials");

  // if user password not same as in db, invalid credentials
  if (req.body.password != user.password)
    return res.status(401).send("Invalid credentials");

  // user successfully authenticated
  user = _.pick(user, ["name", "email", "isSupervisor"]);
  res.send(user);
});

// validates input email and password formats
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
