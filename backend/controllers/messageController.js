const Message = require('../models/Message');
const { initialMessages } = require('../seed/seedData');

let memoryMessages = [...initialMessages.map((m, idx) => ({ ...m, _id: `msg_${idx + 1}` }))];

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// @desc    Submit contact message
// @route   POST /api/messages
// @access  Public
const submitMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Please enter your name.' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  if (!subject || !subject.trim()) {
    return res.status(400).json({ success: false, message: 'Please enter a subject.' });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Please enter your message.' });
  }

  const msgData = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
  };

  if (Message.db && Message.db.readyState === 1) {
    try {
      const created = await Message.create(msgData);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
        data: created,
      });
    } catch (err) {
      console.warn('DB error saving message:', err.message);
    }
  }

  const mockCreated = {
    ...msgData,
    _id: `msg_${Date.now()}`,
    read: false,
    createdAt: new Date(),
  };
  memoryMessages.unshift(mockCreated);

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been sent successfully.',
    data: mockCreated,
  });
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  if (Message.db && Message.db.readyState === 1) {
    try {
      const messages = await Message.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    } catch (err) {
      console.warn('DB error fetching messages:', err.message);
    }
  }

  return res.json({ success: true, count: memoryMessages.length, data: memoryMessages });
};

// @desc    Toggle message read status
// @route   PATCH /api/messages/:id/read
// @access  Private/Admin
const toggleMessageRead = async (req, res) => {
  const { id } = req.params;

  if (Message.db && Message.db.readyState === 1) {
    try {
      const msg = await Message.findById(id);
      if (msg) {
        msg.read = !msg.read;
        const updated = await msg.save();
        return res.json({ success: true, data: updated });
      }
    } catch (err) {
      console.warn('DB error updating message read status:', err.message);
    }
  }

  const idx = memoryMessages.findIndex((m) => m._id === id);
  if (idx !== -1) {
    memoryMessages[idx].read = !memoryMessages[idx].read;
    return res.json({ success: true, data: memoryMessages[idx] });
  }

  res.status(404).json({ success: false, message: 'Message not found.' });
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (Message.db && Message.db.readyState === 1) {
    try {
      const msg = await Message.findById(id);
      if (msg) {
        await msg.deleteOne();
        return res.json({ success: true, message: 'Message deleted successfully.' });
      }
    } catch (err) {
      console.warn('DB error deleting message:', err.message);
    }
  }

  const idx = memoryMessages.findIndex((m) => m._id === id);
  if (idx !== -1) {
    memoryMessages.splice(idx, 1);
    return res.json({ success: true, message: 'Message deleted successfully.' });
  }

  res.status(404).json({ success: false, message: 'Message not found.' });
};

module.exports = {
  submitMessage,
  getMessages,
  toggleMessageRead,
  deleteMessage,
};
