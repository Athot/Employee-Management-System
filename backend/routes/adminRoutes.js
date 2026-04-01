const router = require("express").Router();
const {
  createEmployee,
  getAllEmployee,
  deleteEmployee,
  editEmployee,
  getAdminHrProfile,
} = require("../controllers/adminControllers");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// admin only
router.post(
  "/create-employee",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createEmployee,
);
router.get(
  "/get-all-employee",
  authMiddleware,
  roleMiddleware("ADMIN", "HR"),
  getAllEmployee,
);

router.delete(
  "/delete-employee/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteEmployee,
);

router.put(
  "/edit-employee/:id",
  authMiddleware,
  roleMiddleware("HR"),
  editEmployee,
);

router.get(
  "/get-profile",
  authMiddleware,
  roleMiddleware("ADMIN", "HR"),
  getAdminHrProfile,
);

module.exports = router;
