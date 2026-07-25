const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET || 'supersecretkey_portfolio_jwt_token_2026',
    { expiresIn: '30d' }
  );
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password.' });
  }

  const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@portfolio.com').toLowerCase();
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  // Check database first if connected
  if (User.db && User.db.readyState === 1) {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          token: generateToken(user._id, user.email),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    } catch (err) {
      console.warn('DB login check error, falling back to default env check:', err.message);
    }
  }

  // Fallback to configured default admin credentials if DB is not available or user not found in DB
  if (email.toLowerCase() === defaultAdminEmail && password === defaultAdminPassword) {
    const mockId = 'admin_user_id_1001';
    return res.json({
      success: true,
      token: generateToken(mockId, defaultAdminEmail),
      user: {
        id: mockId,
        name: 'Portfolio Admin',
        email: defaultAdminEmail,
        role: 'admin',
      },
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid email or password.' });
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(404).json({ success: false, message: 'User details not found.' });
  }
};

module.exports = {
  loginUser,
  getMe,
};
