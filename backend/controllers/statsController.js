const Visitor = require('../models/Visitor');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Message = require('../models/Message');

let memoryVisitorCount = 1420;

// @desc    Get visitor count
// @route   GET /api/stats/visitor
// @access  Public
const getVisitorCount = async (req, res) => {
  if (Visitor.db && Visitor.db.readyState === 1) {
    try {
      let stats = await Visitor.findOne({});
      if (!stats) {
        stats = await Visitor.create({ count: 1420, uniqueVisitors: 890 });
      }
      return res.json({ success: true, count: stats.count });
    } catch (err) {
      console.warn('DB error fetching visitor count:', err.message);
    }
  }

  return res.json({ success: true, count: memoryVisitorCount });
};

// @desc    Increment visitor count
// @route   POST /api/stats/visitor
// @access  Public
const incrementVisitorCount = async (req, res) => {
  if (Visitor.db && Visitor.db.readyState === 1) {
    try {
      let stats = await Visitor.findOne({});
      if (!stats) {
        stats = await Visitor.create({ count: 1421, uniqueVisitors: 891 });
      } else {
        stats.count += 1;
        stats.lastVisited = new Date();
        await stats.save();
      }
      return res.json({ success: true, count: stats.count });
    } catch (err) {
      console.warn('DB error incrementing visitor count:', err.message);
    }
  }

  memoryVisitorCount += 1;
  return res.json({ success: true, count: memoryVisitorCount });
};

module.exports = {
  getVisitorCount,
  incrementVisitorCount,
};
