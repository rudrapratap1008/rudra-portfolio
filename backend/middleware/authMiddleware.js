const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey_portfolio_jwt_token_2026');
      
      // If DB is connected, fetch user details, else decode token fallback
      if (User.db.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        req.user = { id: decoded.id, email: decoded.email, role: 'admin' };
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User no longer exists.' });
      }

      return next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed or expired.' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no access token provided.' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Forbidden: Admin access required.' });
  }
};

module.exports = { protect, adminOnly };
