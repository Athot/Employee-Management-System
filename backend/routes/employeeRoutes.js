const router = require("express").Router();
const { getMyProfile } = require("../controllers/employeeController");
const {
  viewMyLeave,
  applyLeave,
  getAllLeaves,
  updateLeaveStatus,
  hasApplyLeave,
} = require("../controllers/leaveControllers");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/get-profile", auth, getMyProfile);

// flag to check whether the employee has applied leave
router.get("/has-apply-leave", auth, role("EMPLOYEE"), hasApplyLeave);
// all about leave
router.post("/add-leave", auth, role("EMPLOYEE"), applyLeave);
router.get("/view-leave/:id", auth, role("EMPLOYEE"), viewMyLeave);
// get all leaves
router.get("/get-all-leave", auth, role("ADMIN", "HR"), getAllLeaves);
// update the leave status
router.put("/update-leave/:id", auth, role("ADMIN", "HR"), updateLeaveStatus);
module.exports = router;
