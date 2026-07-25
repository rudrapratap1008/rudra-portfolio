const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      default: 1,
    },
    uniqueVisitors: {
      type: Number,
      default: 1,
    },
    lastVisited: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visitor', visitorSchema);
