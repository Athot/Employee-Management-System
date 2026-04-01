// Admin can add/remove employees
// create employee
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Employee = require("../models/Employee");
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, department, position, salary } = req.body;
    //  create user employee login
    const hashedPassword = await bcrypt.hash(password, 10);

    // existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // console.log("User already exist");
      return res.status(400).json({ msg: "User already exist" });
    }
    // add employee
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "EMPLOYEE",
    });

    // create employee profile
    const employee = await Employee.create({
      userID: user._id,
      department,
      position,
      salary,
    });

    res.json({ user, employee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//remove the employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    // console.log(employeeId);
    if (!employeeId) {
      return res.status(400).json({ msg: "Employee ID is required" });
    }

    // 1. Find employee first
    const employee = await Employee.findOne({ userID: employeeId });
    // console.log(employee);
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    // 2. Delete employee
    await Employee.findOneAndDelete({ userID: employeeId });

    // 3. Delete associated user
    await User.findByIdAndDelete(employee.userID);

    return res
      .status(200)
      .json({ msg: "Employee and User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// HR can view and edit employee details
exports.getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find().populate("userID", "name role");
    // if(employees.map((e) => ))

    const formatted = employees.map((emp) => ({
      // id: emp._id,
      userID: emp.userID._id,
      name: emp.userID.name,
      role: emp.userID.role,
      department: emp.department,
      position: emp.position,
      salary: emp.salary,
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.editEmployee = async (req, res) => {
  try {
    const userID = req.params.id;
    // console.log("HIT");
    const updatedEmployee = await Employee.findOneAndUpdate(
      { userID: userID },
      req.body,
      {
        returnDocument: true,
        runValidators: true,
      },
    );

    if (!updatedEmployee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// leave
// profile
exports.getAdminHrProfile = async (req, res) => {
  try {
    const id = req.user.id;
    // console.log(id);
    const profile = await User.findById(id).populate("name email role");

    res.json(profile);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
