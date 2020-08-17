const app = require("express").Router();
const multer = require("multer");
const upload = multer();
const bcrypt = require("bcryptjs");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const Userse = require("../Model/Userse");
const { update } = require("../Model/Userse");
app.use("/*", (req, res, next) => next());
app.post("/login", upload.none(), async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.json({ error: "field is empty" });
  }
  await User.findOne({ email: req.body.email })
    .then((data) => {
      console.log(data);
      if (!data) {
        return res.json({ error: "email is not valid" });
      }

      bcrypt.compare(req.body.password, data.password, function (err, resx) {
        if (!resx) {
          return res.json({ error: "invalid credential" });
        }
        jwt.sign({ id: req.body.email }, "141efcf13r1", (err, token) => {
          if (err) {
            console.log(err);
            return res.json({ error: "token gen failed" });
          }

          if (token) {
            const mUserse = new Userse({
              user_id: data._id,
              token: token,
              is_active: true,
            });

            mUserse.save();

            return res.json({
              token: token,
              _id: data._id,
              email: data.email,
              name: data.name,
            });
          }
        });
      });
    })
    .catch((error) => {});

  console.log(req.body);
});

app.post("/register", upload.none(), async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.json({ error: "field empty " });
  }

  await User.findOne({ email: req.body.email }).then((data) => {
    console.log(data);
    if (data) {
      return res.json({ error: "email is already exist" });
    }
  });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const muser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  muser
    .save()
    .then((data) => {
      return res.json({ email: data.email, name: data.name });
    })
    .catch((error) => {
      console.log(error);
    });
});
app.post("/logout", upload.none(), async (req, res) => {
  console.log(req.body.id);
  if (!req.body.id) {
    return { error: "field is missing" };
  }
  await userses
    .findOneAndDelete({ _id: req.body.id })
    .then((deletedToken) => {
      return res.json({ data: deletedToken });
    })
    .catch((err) => {
      return res.json({ error: "internal error" });
    });
});

module.exports = app;
