const Booking = require("../models/Booking");

// ✅ CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      concertId,
      ticketCount,
      totalPrice,
      seats
    } = req.body;

    const booking = await Booking.create({
      user: userId,
      concert: concertId,
      ticketCount,
      totalPrice,
      seats
    });

    res.status(201).json({
      message: "Booking successful",
      booking
    });

  } catch (error) {
    console.log("Booking error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET USER BOOKINGS
exports.getUserBookings = async (req, res)  => {
  try {
    const bookings = await Booking.find({
      user: req.params.userId,
    })
      .populate("concert")   // 🔥 THIS IS THE FIX
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};