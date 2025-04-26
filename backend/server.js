// 1) Load env vars as the very first thing
require('dotenv').config()

// 2) Then import everything else
const express        = require('express')
const mongoose       = require('mongoose')
const cors           = require('cors')
const authRoutes     = require('./routes/auth')
const generateRoutes = require('./routes/generate')
const historyRoutes = require('./routes/history');
const courseRoutes = require('./routes/course');

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('M32 AI Backend running 🚀'))
app.use('/api/auth',     authRoutes)
app.use('/api/generate', generateRoutes)
app.use('/api/history', historyRoutes);
app.use('/api/courses', courseRoutes);

// Connect MongoDB & Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    console.log('🔑 Cohere key loaded?', !!process.env.COHERE_API_KEY)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error(err))
