const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// GET all resources
router.get('/', async (req, res) => {
  const resources = await Resource.find();
  res.json(resources);
});

// POST create resource
router.post('/', async (req, res) => {
  const newResource = await Resource.create(req.body);
  res.json(newResource);
});

module.exports = router;