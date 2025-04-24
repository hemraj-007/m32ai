const express = require('express');
const { generateContent } = require('../services/generator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Generation = require('../models/Generation');

// Middleware
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

// POST /api/generate
router.post('/', authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt required' });

  try {
    const result = await generateContent(prompt);

    // ✅ Save to MongoDB
    await Generation.create({
      user: req.user.id,
      prompt,
      response: result
    });

    res.json({ response: result });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate', error: err.message });
  }
});

module.exports = router;
