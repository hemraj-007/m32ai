const mongoose = require('mongoose');

const generationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false }, // ✅ Add this
  prompt: { type: String, required: true },
  response: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Generation', generationSchema);
