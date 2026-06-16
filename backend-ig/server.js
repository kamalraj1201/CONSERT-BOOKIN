const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* CORS */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:5173",
      "https://consert-bookin.vercel.app",
      "https://consert-bookin-8yno13dsu-kamalrajs-projects-e8337ecd.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

app.use(express.json());

/* CONNECT MONGODB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ROUTES */
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/concerts", require("./routes/concertRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
