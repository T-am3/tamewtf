const express = require('express');
const router = express.Router();

// GET /api - Basic API info
router.get('/', (req, res) => {
  res.json({
    name: 'hi :3',
  });
});

module.exports = router;