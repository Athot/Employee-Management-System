const router = require("express").Router();
const {
  checkIn,
  checkOut,
  getEmployeeAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/check-in", authMiddleware, roleMiddleware("EMPLOYEE"), checkIn);
router.post("/check-out", authMiddleware, roleMiddleware("EMPLOYEE"), checkOut);
router.get(
  "/my-attendance",
  authMiddleware,
  roleMiddleware("EMPLOYEE"),
  getEmployeeAttendance,
);
router.get(
  "/get-all-attendance",
  authMiddleware,
  roleMiddleware("ADMIN", "HR"),
  getAllAttendance,
);

module.exports = router;
