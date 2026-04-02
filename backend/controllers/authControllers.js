const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// register
// admin password (123456)
// Employee password 1234
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({ msg: "User exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  res.json({ token: generateToken(user), user });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // ❌ User not found
    if (!user) {
      return res.status(200).json({ msg: 1 });
    }

    // ❌ Password not matched
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ msg: 2 });
    }

    // ✅ Success
    return res.json({
      token: generateToken(user),
      user,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
