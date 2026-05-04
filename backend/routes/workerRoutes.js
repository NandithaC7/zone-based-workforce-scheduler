const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

router.get('/', async (req, res) => {
  const workers = await Worker.find();
  res.json(workers);
});

module.exports = router;