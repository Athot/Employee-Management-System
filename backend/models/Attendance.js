const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String, // YYYY-MM-DD
    },
    checkIn: Date,
    checkOut: Date,
    totalHours: Number,
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE", "HALF_DAY"],
      default: "PRESENT",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Attendance", attendanceSchema);
