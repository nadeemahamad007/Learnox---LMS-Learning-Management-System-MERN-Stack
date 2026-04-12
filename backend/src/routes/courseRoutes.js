const express = require("express");
const { body } = require("express-validator");

const { getCourses, createCourse } = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateRequest = require("../utils/validateRequest");

const router = express.Router();

router.get("/", getCourses);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("instructor").trim().notEmpty().withMessage("Instructor is required"),
    body("duration").trim().notEmpty().withMessage("Duration is required")
  ],
  validateRequest,
  createCourse
);

module.exports = router;
