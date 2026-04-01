const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

dotenv.config();
connectDB();
const app = express();
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://employee-management-system-six-mu.vercel.app",
// ];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://employee-management-system-six-mu.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());

// app.options("*", cors());
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/salary", require("./routes/salaryRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
