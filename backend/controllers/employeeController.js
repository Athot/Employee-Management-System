const Employee = require("../models/Employee");

// admin : create employee
exports.getMyProfile = async (req, res) => {
  try {
    // console.log(req.user.id);
    const id = req.user.id;
    const employee = await Employee.findOne({ userID: id }).populate(
      "userID",
      "name email role",
    );
    console.log(employee);
    res.json(employee);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
