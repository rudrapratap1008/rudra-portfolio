const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProfile)
  .put(protect, adminOnly, updateProfile);

module.exports = router;
