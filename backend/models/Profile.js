const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
  skillsUsed: [{ type: String }],
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  grade: { type: String },
  description: { type: String },
});

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: 'Rudra Pratap Singh Bhadoriya' },
    title: { type: String, required: true, default: 'Full Stack Developer' },
    roles: [{ type: String }],
    bio: { type: String, required: true },
    location: { type: String, default: 'India' },
    email: { type: String, default: 'Rudrapratap.86299@gmail.com' },
    phone: { type: String, default: '+91 8629906409' },
    avatarUrl: { type: String, default: '/profile.jpeg' },
    resumeUrl: { type: String, default: '/resume.pdf' },
    githubUrl: { type: String, default: 'https://github.com/rudrapratap1008' },
    linkedinUrl: { type: String, default: 'https://www.linkedin.com/in/rudra-pratap-singh-bhadoriya-98b829379' },
    twitterUrl: { type: String, default: 'https://twitter.com' },
    leetcodeUrl: { type: String, default: 'https://leetcode.com' },
    yearsOfExperience: { type: Number, default: 2 },
    projectsCompleted: { type: Number, default: 15 },
    happyClients: { type: Number, default: 12 },
    experience: [experienceSchema],
    education: [educationSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
