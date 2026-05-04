const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');

router.get('/', async (req, res) => {
  const zones = await Zone.find();
  res.json(zones);
});

module.exports = router;