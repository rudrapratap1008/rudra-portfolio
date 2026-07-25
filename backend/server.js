const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Personal Portfolio MERN Stack Backend API is running smoothly.',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

// API Documentation Summary Endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Personal Portfolio REST API Reference',
    endpoints: [
      { method: 'POST', path: '/api/auth/login', desc: 'Authenticate admin & return JWT token' },
      { method: 'GET', path: '/api/auth/me', desc: 'Get logged in user info' },
      { method: 'GET', path: '/api/profile', desc: 'Get portfolio owner profile' },
      { method: 'PUT', path: '/api/profile', desc: 'Update owner profile (Admin)' },
      { method: 'GET', path: '/api/projects', desc: 'Get all projects (Supports ?category= & ?search=)' },
      { method: 'POST', path: '/api/projects', desc: 'Create a new project (Admin)' },
      { method: 'PUT', path: '/api/projects/:id', desc: 'Update a project (Admin)' },
      { method: 'DELETE', path: '/api/projects/:id', desc: 'Delete a project (Admin)' },
      { method: 'GET', path: '/api/skills', desc: 'Get skills list (Supports ?category=)' },
      { method: 'POST', path: '/api/skills', desc: 'Create new skill (Admin)' },
      { method: 'PUT', path: '/api/skills/:id', desc: 'Update a skill (Admin)' },
      { method: 'DELETE', path: '/api/skills/:id', desc: 'Delete a skill (Admin)' },
      { method: 'GET', path: '/api/certificates', desc: 'Get all certificates' },
      { method: 'POST', path: '/api/certificates', desc: 'Create new certificate (Admin)' },
      { method: 'PUT', path: '/api/certificates/:id', desc: 'Update a certificate (Admin)' },
      { method: 'DELETE', path: '/api/certificates/:id', desc: 'Delete a certificate (Admin)' },
      { method: 'POST', path: '/api/messages', desc: 'Submit contact message from visitor' },
      { method: 'GET', path: '/api/messages', desc: 'View contact messages (Admin)' },
      { method: 'PATCH', path: '/api/messages/:id/read', desc: 'Toggle read status (Admin)' },
      { method: 'DELETE', path: '/api/messages/:id', desc: 'Delete message (Admin)' },
      { method: 'GET', path: '/api/stats/visitor', desc: 'Get total visitor count' },
      { method: 'POST', path: '/api/stats/visitor', desc: 'Increment visitor count' },
    ],
  });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
});
