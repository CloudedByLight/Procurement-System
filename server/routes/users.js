const { User, validate } = require("../models/user");
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

  // check if user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // create user obj and save it to db
  user = new User(
    _.pick(req.body, ["name", "email", "password", "isSupervisor"])
  );
  await user.save();

  user = _.pick(user, ["name", "email", "isSupervisor"]);
  res.send(user);
});

module.exports = router;
