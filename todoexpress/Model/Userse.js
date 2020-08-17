const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Userse = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Userse", Userse);
