const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: String,
    month: String,
    basic: Number,
    hra: Number,
    allowances: Number,
    deductions: Number,
    netSalary: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Salary", salarySchema);
