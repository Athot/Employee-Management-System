const Attendance = require("../models/Attendance");

const getToday = () => new Date().toISOString().split("T")[0];
// console.log(getToday);
// attendance checkIn for today
exports.checkIn = async (req, res) => {
  try {
    // console.log("Check in");
    let status = "PRESENT";
    const now = new Date();
    const today = getToday();
    const existing = await Attendance.findOne({
      userID: req.user.id,
      date: today,
    });
    if (existing) {
      return res.status(200).json({ msg: 0 });
    }
    const checkInTime = new Date();
    checkInTime.setHours(11, 0, 0, 0, 0);

    // if the checkin is lesser than morning 11 AM than it will not store in the database
    if (now > checkInTime) {
      status = "LATE";
    }
    const attendance = await Attendance.create({
      userID: req.user.id,
      date: today,
      checkIn: now,
      status: status,
    });
    // console.log(attendance);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// attendance checkOut for today
exports.checkOut = async (req, res) => {
  try {
    const today = getToday();

    const attendance = await Attendance.findOne({
      userID: req.user.id,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({ msg: "Check in first" });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ msg: "Already checked out" });
    }

    const checkOutTime = new Date();

    const totalHours =
      (checkOutTime - new Date(attendance.checkIn)) / (1000 * 60 * 60);

    // 🔥 DO NOT RESET STATUS HERE
    let finalStatus = attendance.status; // keep check-in status

    if (totalHours < 4) {
      finalStatus = "HALFDAY";
    }

    attendance.checkOut = checkOutTime;
    attendance.totalHours = totalHours;
    attendance.status = finalStatus;

    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
//  view my attendance
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ userID: req.user.id });
    if (!records) return res.status(400).json({ msg: "No attendance found" });
    res.json(records);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// get all attendance by ADMIN and HR
exports.getAllAttendance = async (req, res) => {
  try {
    // console.log("Get all attendance");
    const records = await Attendance.find().populate("userID", "name email");
    if (!records) return res.status(400).json({ msg: "No attendance found" });
    res.json(records);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
