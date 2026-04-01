const express = require("express");
const router = express.Router();
const {
  createConcert,
  getAllConcerts,
  getSingleConcert
} = require("../controller/concertController");

router.post("/", createConcert);
router.get("/", getAllConcerts);
router.get("/:id", getSingleConcert);

module.exports = router;
