const express = require("express");

const {
  enrollInCourse,
  getMyEnrollments
} = require("../controllers/enrollmentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:courseId", authMiddleware, enrollInCourse);
router.get("/my-courses", authMiddleware, getMyEnrollments);

module.exports = router;
