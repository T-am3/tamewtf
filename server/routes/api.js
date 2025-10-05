const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'hi :3',
  });
});

module.exports = router;