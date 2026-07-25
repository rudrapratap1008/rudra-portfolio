const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    fullDescription: {
      type: String,
    },
    image: {
      type: String,
      required: [true, 'Project image URL is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Full Stack', 'Frontend', 'Backend', 'AI & ML', 'Mobile'],
      default: 'Full Stack',
    },
    technologies: [
      {
        type: String,
        required: true,
      },
    ],
    githubLink: {
      type: String,
      required: true,
    },
    liveDemoLink: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
