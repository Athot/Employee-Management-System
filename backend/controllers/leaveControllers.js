const Employee = require("../models/Employee");
const Leave = require("../models/Leave");

exports.hasApplyLeave = async (req, res) => {
  try {
    // console.log("Has apply leave");
    const userID = req.user.id;
    // const { leaveType, fromDate, toDate, reason } = req.body;
    // get today start and end
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(29, 59, 59, 999);
    // console.log(userID);
    // check if leave already exist for today
    const existingLeave = await Leave.find({
      userID: userID,
      fromDate: { $lte: endOfToday },
      toDate: { $gte: today },
    });
    // console.log(existingLeave);
    if (existingLeave.length != 0) {
      console.log(existingLeave);
      return res.status(200).json({ msg: 1 });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.applyLeave = async (req, res) => {
  try {
    const userID = req.user.id;
    const { leaveType, fromDate, toDate, reason } = req.body;

    // leave can apply only 1 leave in 1 day
    if (!userID) return res.status(401).json({ msg: "UserID is null" });
    if (new Date(fromDate) > new Date(toDate)) {
      return res.status(401).json({ msg: "Invalid date range" });
    }

    // get today start and end
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(29, 59, 59, 999);

    // check if leave already exist for today
    const existingLeave = await Leave.findOne({
      userID,
      fromDate: { $lte: endOfToday },
      toDate: { $gte: today },
    });

    if (existingLeave) {
      return res.status(200).json({ msg: 0 });
    }
    const leave = await Leave.create({
      userID: userID,
      leaveType,
      fromDate,
      toDate,
      reason,
    });
    return res.json(leave);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// employees will be able to view their leaves
exports.viewMyLeave = async (req, res) => {
  try {
    // we will need emp ID
    const empID = req.params.id;
    if (!empID) return res.status(400).json({ msg: "ID is missing" });
    const employee = await Leave.find({ userID: empID });
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// getAllLeaves by HR and ADMIN
exports.getAllLeaves = async (req, res) => {
  try {
    const employee = await Leave.find().populate("userID", "name");
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// updateLeaveStatus by  HR and ADMIN
exports.updateLeaveStatus = async (req, res) => {
  try {
    const userID = req.params.id;
    const employee = await Leave.findByIdAndUpdate(
      userID,

      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    // console.log(employee);
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
