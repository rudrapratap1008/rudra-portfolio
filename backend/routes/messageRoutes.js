const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, toggleMessageRead, deleteMessage } = require('../controllers/messageController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .post(submitMessage)
  .get(protect, adminOnly, getMessages);

router.patch('/:id/read', protect, adminOnly, toggleMessageRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
