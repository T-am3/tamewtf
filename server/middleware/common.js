const express = require('express');

// Simple rate limiting middleware
const createRateLimit = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get existing requests for this IP
    const userRequests = requests.get(key) || [];

    // Filter out old requests
    const recentRequests = userRequests.filter(timestamp => timestamp > windowStart);

    // Check if user has exceeded the limit
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
      });
    }

    // Add current request
    recentRequests.push(now);
    requests.set(key, recentRequests);

    // Add rate limit headers
    res.set({
      'X-RateLimit-Limit': maxRequests,
      'X-RateLimit-Remaining': Math.max(0, maxRequests - recentRequests.length),
      'X-RateLimit-Reset': new Date(now + windowMs).toISOString()
    });

    next();
  };
};

// Logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'",
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });

  next();
};

// Request timeout middleware
const timeout = (timeoutMs = 30000) => {
  return (req, res, next) => {
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          error: 'Request timeout',
          message: `Request took longer than ${timeoutMs}ms`
        });
      }
    }, timeoutMs);

    res.on('finish', () => {
      clearTimeout(timeoutId);
    });

    next();
  };
};

module.exports = {
  createRateLimit,
  requestLogger,
  securityHeaders,
  timeout
};