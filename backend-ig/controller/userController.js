const User = require("../models/User");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};