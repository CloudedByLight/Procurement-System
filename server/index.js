const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const users = require("./routes/users");
const requests = require("./routes/requests");

const app = express();

/*
Adds appropriate headers to requests since front-end
is running on a different domain or port than
backend (Express.js server).
*/
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/acqsys", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established successfully"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/requests", requests);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
