const { Request, validatePost, validatePut } = require("../models/request");
const { User } = require("../models/user");
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// access one's own request history
router.get("/:email", async (req, res) => {
  // get all requests by current email excluding _id property
  const requests = await Request.find({ email: req.params.email }, { _id: 0 });
  res.send(requests);
});

/* If user is supervisor, access all pending requests.
Else if user is regular employee, access user's non-pending requests. */
router.get("/:email/notifications", async (req, res) => {
  let user = await User.findOne({ email: req.params.email });

  // if regular employee, get all current user's non-pending requests
  if (user && !user.isSupervisor) {
    const requests = await Request.find({
      email: req.params.email,
      status: { $ne: "Pending" },
    });
    res.send(requests);
  }
  // if supervisor, get all pending requests
  else if (user && user.isSupervisor) {
    const requests = await Request.find({
      status: "Pending",
    });
    res.send(requests);
  } else res.status(401).send("User doesn't seem to be registered.");
});

// If user is supervisor, update request with given req.params.id.
router.put("/:id", async (req, res) => {
  // API PUT req format validation
  const { error } = validatePut(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  // if user is supervisor, update the req with given req.params.id
  if (user && user.isSupervisor) {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true } // returns the update version
    );
    if (!request) {
      return res
        .status(404)
        .send("The request with the given ID was not found.");
    }
    res.send(request);
  }
  // if user not supervisor, PUT req is forbidden
  else if (user && !user.isSupervisor)
    res.status(403).send("User is not a supervisor");
  else res.status(401).send("User doesn't seem to be registered.");
});

router.post("/", async (req, res) => {
  // API POST req format validation
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // create request obj and save it to db
  const request = new Request(
    _.pick(req.body, ["email", "item", "quantity", "reason"])
  );
  await request.save();

  res.send(request);
});

module.exports = router;
