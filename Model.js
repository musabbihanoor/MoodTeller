const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = Model = mongoose.model("model", modelSchema);
