const Todo = require("../Model/Todo");
const app = require("express").Router();
const multer = require("multer");
const Userse = require("../Model/Userse");
const upload = multer();

app.use("/*", (req, res, next) => next());

app.post("/create", upload.none(), async (req, res) => {
  if (!req.body.details || !req.body.user_id) {
    res.json({ error: "field empty " });
  }

  const useDetails = new Todo({
    user_id: req.body.user_id,
    details: req.body.details,
    is_connect: true,
  });

  await useDetails
    .save()
    .then((storedData) => {
      res.json({
        data: storedData,
      });
    })
    .catch((err) => {
      res.json({
        error: "Internal error in todo",
      });
    });
});

app.post("/getall", async (req, res) => {
  if (!req.body.user_id) {
    return res.json({ error: "invalide user_id" });
  }

  await Todo.find({ user_id: req.body.user_id })
    .then((data) => {
      if (!data) {
        return res.json({ error: "no data found" });
      }
      return res.json({ data: data });
    })
    .catch((err) => {});
});

app.post("/edit", async (req, res) => {
  if (!req.body.id || !req.body.details) {
    return res.json({ error: "Fields missing!" });
  }

  await Todo.findOneAndUpdate(
    { _id: req.body.id },
    { details: req.body.details }
  )
    .then((updatedData) => {
      return res.json({ data: updatedData });
    })
    .catch((err) => {
      res.json({ error: "Internal Error" });
    });
});

app.post("/delete", async (req, res) => {
  // TOKEN CHECKING
  // if (!req.header("SESSION-TOKEN")) {
  //   return res.json({ error: "invalid request" });
  // }
  // Userse.findOne({ token: req.header("SESSION-TOKEN") })
  //   .then((data) => {
  //     if (!data) {
  //       return res.json({ error: "invalid request" });
  //     }
  //     if (!data.is_active) {
  //       return res.json({ error: "this token is inactive right now!" });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // IF EVERYTHING GOES RIGHT
  console.log(req.body.id);
  if (!req.body.id) {
    return { error: "field is missing" };
  }
  await Todo.findOneAndDelete({ _id: req.body.id })
    .then((deletedData) => {
      return res.json({ data: deletedData });
    })
    .catch((err) => {
      return res.json({ error: "internal error" });
    });
});
app.post("/complete", async (req, res) => {
  if (!req.body._id || req.body.is_connect) {
    return { error: "field is missing" };
  }
  await Todo.findOneAndUpdate(
    { _id: req.body.id },
    { is_connect: req.body.is_connect }
  )
    .then((editedData) => {
      return res.json({ data: editedData });
    })
    .catch((err) => {
      return res.json({ error: "internal error" });
    });
});

module.exports = app;
