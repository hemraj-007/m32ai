const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');

// Middleware to verify user
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// POST /api/courses - create a new course
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Course name is required' });

  try {
    const newCourse = await Course.create({
      name,
      user: req.user.id,
    });

    res.json({ course: newCourse });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create course', error: err.message });
  }
});

// GET /api/courses - get all courses of logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load courses', error: err.message });
  }
});

// DELETE /api/courses/:id - delete a course
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      await Course.deleteOne({ _id: req.params.id, user: req.user.id });
      res.json({ message: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete course', error: err.message });
    }
  });

  // PUT /api/courses/:id - update a course name
router.put('/:id', authMiddleware, async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'New name is required' });
  
    try {
      const course = await Course.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { name },
        { new: true }
      );
      res.json({ course });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update course', error: err.message });
    }
  });

  router.get('/:id', authMiddleware, async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.json({ name: course.name });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch course', error: err.message });
    }
  });
  

module.exports = router;
