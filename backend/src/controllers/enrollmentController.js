const mongoose = require("mongoose");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(409).json({ message: "Already enrolled in this course" });
    }

    await Enrollment.create({
      user: req.user._id,
      course: courseId
    });

    res.status(201).json({
      message: "Enrollment successful"
    });
  } catch (error) {
    next(error);
  }
};

const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate("course")
      .sort({ createdAt: -1 });

    const courses = enrollments
      .filter((enrollment) => enrollment.course)
      .map((enrollment) => ({
        enrollmentId: enrollment._id,
        enrolledAt: enrollment.createdAt,
        ...enrollment.course.toObject()
      }));

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enrollInCourse,
  getMyEnrollments
};
