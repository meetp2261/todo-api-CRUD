const express = require("express");
const app = express();
const bodyparser = require("body-parser");
require("dotenv").config();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
mongoose
  .connect(process.env.SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const User = require("./Routes/User");
const Todo = require("./Routes/Todo");

app.use("/user", User);
app.use("/todo", Todo);
app.listen(process.env.PORT, () => {
  console.log(`SERVER HAS STATED ON ${process.env.PORT}`);
});
