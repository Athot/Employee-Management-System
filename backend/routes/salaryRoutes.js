const {
  createSalary,
  generateSalarySlip,
  getEmployeeSalary,
  getSalary,
} = require("../controllers/salaryControllers");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = require("express").Router();
// salary routes
router.post("/create-salary", auth, role("ADMIN", "HR"), createSalary);
// get own salary
router.get("/my-salary", auth, role("EMPLOYEE"), getEmployeeSalary);
// get the salary slip
router.get("/slip/:id", auth, generateSalarySlip);

// get all salary
router.get("/get-salary", auth, getSalary);

module.exports = router;
