const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// GET all members
router.get('/', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// POST create member
router.post('/', async (req, res) => {
  const newMember = await Member.create(req.body);
  res.json(newMember);
});

module.exports = router;