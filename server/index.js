const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Import routes
const lastfmRoutes = require('./routes/lastfm');
const apiRoutes = require('./routes/api');
const discordRoutes = require('./routes/discord');

// Import middleware
const { createRateLimit, requestLogger, securityHeaders, timeout } = require('./middleware/common');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use(securityHeaders);

// Request logging (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

// Rate limiting - stricter for LastFM routes
const lastfmRateLimit = createRateLimit(15 * 60 * 1000, 50); // 50 requests per 15 minutes for LastFM
const generalRateLimit = createRateLimit(15 * 60 * 1000, 100); // 100 requests per 15 minutes for general

// Apply rate limiting
app.use('/lastfm', lastfmRateLimit);
app.use('/', generalRateLimit);

// Request timeout
app.use(timeout(30000)); // 30 second timeout

// Routes
app.use('/lastfm', lastfmRoutes);
app.use('/api', apiRoutes);
app.use('/discord', discordRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'tame.wtf server',
    version: '1.0.0',
    docs: '/'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);

  // Handle different types of errors
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Invalid JSON in request body',
      code: 'INVALID_JSON'
    });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'Request entity too large',
      code: 'PAYLOAD_TOO_LARGE'
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    code: err.code || 'INTERNAL_ERROR',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND',
    availableEndpoints: {
      root: '/',
      api: '/',
      lastfm: {
        recent: '/lastfm/recent',
        topTracks: '/lastfm/top-tracks'
      },
      discord: {
        profile: '/discord/profile'
      }
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API docs: http://localhost:${PORT}/`);
});