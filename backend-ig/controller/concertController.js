const Concert = require("../models/Concert");

exports.createConcert = async (req, res) => {
  try {
    const concert = await Concert.create(req.body);
    res.status(201).json(concert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllConcerts = async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    res.json(concert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
