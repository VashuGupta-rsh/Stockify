const { Schema } = require("mongoose");

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  funds: {
    type: Number,
    default: 10000,
  }
});

module.exports = { UsersSchema };
