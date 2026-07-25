const express = require('express');
const router = express.Router();
const { getVisitorCount, incrementVisitorCount } = require('../controllers/statsController');

router.get('/visitor', getVisitorCount);
router.post('/visitor', incrementVisitorCount);

module.exports = router;
