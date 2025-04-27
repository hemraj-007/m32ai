const express = require('express');
const jwt = require('jsonwebtoken');
const Generation = require('../models/Generation');

const router = express.Router();

// Reuse auth middleware
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

// GET /api/history
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.query;

    const filter = { user: req.user.id };
    if (courseId) {
      filter.course = courseId;
    }

    const history = await Generation.find(filter).sort({ createdAt: -1 });

    res.json({ history });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history', error: err.message });
  }
});

module.exports = router;
