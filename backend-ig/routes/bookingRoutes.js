const express = require("express");
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getAllBookings,
} = require("../controller/bookingController");

router.post("/", createBooking);
router.get("/user/:userId", getUserBookings);
router.get("/", getAllBookings);

module.exports = router;