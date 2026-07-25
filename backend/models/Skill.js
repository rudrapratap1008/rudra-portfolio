const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['Frontend', 'Backend', 'Database', 'Tools'],
    },
    proficiency: {
      type: Number,
      required: [true, 'Proficiency percentage is required'],
      min: 0,
      max: 100,
    },
    iconName: {
      type: String, // lucide icon identifier name
      default: 'Code',
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
