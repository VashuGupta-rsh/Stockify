const { Schema } = require('mongoose');

// Define the simplified Holdings schema
const HoldingsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who owns this holding
    required: true,
  },
});

// Create the model for Holdings based on the schema

module.exports = { HoldingsSchema };
