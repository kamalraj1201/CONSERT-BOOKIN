const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    concert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Concert",
      required: true,
    },

    ticketCount: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    seats: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);