const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuer organization is required'],
    },
    issueDate: {
      type: String,
      required: [true, 'Issue date is required'],
    },
    credentialId: {
      type: String,
    },
    credentialUrl: {
      type: String,
    },
    image: {
      type: String,
      required: [true, 'Certificate image URL is required'],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);
