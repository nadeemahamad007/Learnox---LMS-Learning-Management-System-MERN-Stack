const Course = require("../models/Course");

const getCourses = async (_req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, instructor, duration } = req.body;

    const course = await Course.create({
      title,
      description,
      instructor,
      duration
    });

    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  createCourse
};
