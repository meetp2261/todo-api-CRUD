const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Todo = new Schema({
  details: {
    type: String,
    require: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  is_connect: {
    type: Boolean,
    require: true,
  },
});
module.exports = mongoose.model("Todo", Todo);
