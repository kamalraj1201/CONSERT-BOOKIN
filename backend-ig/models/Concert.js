const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
  title: String,
  artist: String,
  date: Date,
  venue: String,
  price: Number,
  availableSeats: Number,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Concert", concertSchema);
