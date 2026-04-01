const mongoose = require("mongoose");
const employSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    department: String,
    position: String,
    salary: Number,
    joiningDate: Date,
    address: String,
    phone: String,
  },
  { timeStamps: true },
);

module.exports = mongoose.model("Employee", employSchema);
