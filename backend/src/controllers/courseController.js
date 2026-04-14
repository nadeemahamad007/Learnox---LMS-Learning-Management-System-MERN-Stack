const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const defaultCourses = require("../data/defaultCourses");

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

const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Enrollment.deleteMany({ course: courseId });

    res.status(200).json({
      message: "Course removed successfully"
    });
  } catch (error) {
    next(error);
  }
};

const seedDefaultCourses = async (_req, res, next) => {
  try {
    const existingCourses = await Course.find({}, "title instructor");
    const existingKeys = new Set(
      existingCourses.map((course) => `${course.title.toLowerCase()}::${course.instructor.toLowerCase()}`)
    );

    const coursesToCreate = defaultCourses.filter((course) => {
      const key = `${course.title.toLowerCase()}::${course.instructor.toLowerCase()}`;
      return !existingKeys.has(key);
    });

    if (coursesToCreate.length) {
      await Course.insertMany(coursesToCreate);
    }

    res.status(201).json({
      message:
        coursesToCreate.length > 0
          ? `${coursesToCreate.length} demo courses added successfully`
          : "Demo courses are already available"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  createCourse,
  deleteCourse,
  seedDefaultCourses
};
