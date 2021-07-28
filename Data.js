const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
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

module.exports = NewData = mongoose.model("data", dataSchema);
