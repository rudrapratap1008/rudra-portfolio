const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Message = require('../models/Message');

dotenv.config({ path: '../.env' });

const initialProfile = {
  name: 'Rudra Pratap Singh Bhadoriya',
  title: 'Full Stack Developer',
  roles: ['Full Stack Developer', 'MERN Stack Developer', 'React Developer', 'Node.js Developer'],
  bio: "I'm Rudra Pratap Singh Bhadoriya, a passionate Full Stack Web Developer who enjoys building modern, responsive, and scalable web applications. I specialize in React.js, Node.js, Express.js, and MongoDB. I love solving real-world problems through clean code and continuously learning new technologies to improve my development skills.",
  location: 'India',
  email: 'Rudrapratap.86299@gmail.com',
  phone: '+91 8629906409',
  avatarUrl: '/profile.jpeg',
  resumeUrl: '/resume.pdf',
  githubUrl: 'https://github.com/rudrapratap1008',
  linkedinUrl: 'https://www.linkedin.com/in/rudra-pratap-singh-bhadoriya-98b829379',
  twitterUrl: 'https://twitter.com',
  leetcodeUrl: 'https://leetcode.com',
  yearsOfExperience: 2,
  projectsCompleted: 15,
  happyClients: 12,
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'Tech Solutions',
      period: '2023 - Present',
      description: 'Developing responsive web applications using React.js, Node.js, Express.js, and MongoDB.',
      skillsUsed: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    },
    {
      role: 'Frontend Developer Intern',
      company: 'Digital Innovators',
      period: '2022 - 2023',
      description: 'Built interactive UI components and integrated RESTful APIs with React and Redux.',
      skillsUsed: ['React', 'JavaScript', 'HTML5', 'CSS3', 'REST API'],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology (B.Tech) in Computer Science',
      institution: 'University College of Engineering',
      period: '2020 - 2024',
      grade: 'First Class with Distinction',
      description: 'Core Focus: Software Engineering, Data Structures & Algorithms, Web Technologies, Database Systems.',
    },
  ],
};

const initialProjects = [
  {
    title: 'CloudPulse - SaaS Project Management Workspace',
    description: 'Real-time collaborative Kanban & task management platform built with React, Socket.io, Node.js, and MongoDB.',
    fullDescription: 'CloudPulse is an enterprise-grade SaaS project management tool featuring drag-and-drop Kanban boards, live team collaboration via WebSockets, granular permission roles, JWT authentication, and interactive analytics reporting charts.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=900',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Socket.io'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://cloudpulse-demo.example.com',
    featured: true,
    order: 1,
  },
  {
    title: 'NexusCommerce - Modern E-Commerce Platform',
    description: 'Feature-rich online store with Stripe payment gateway, product search, cart persistence, and admin inventory dashboard.',
    fullDescription: 'NexusCommerce is a full-featured e-commerce platform offering real-time inventory management, Stripe checkout integration, user reviews, order tracking, and an intuitive admin analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=900',
    category: 'Full Stack',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://nexuscommerce-demo.example.com',
    featured: true,
    order: 2,
  },
  {
    title: 'NeuroVision - AI Image Recognition Studio',
    description: 'AI-powered image analysis web application utilizing OpenAI Vision API for instant object tagging and background removal.',
    fullDescription: 'NeuroVision empowers users to analyze images, generate automatic alt tags, remove backgrounds, and extract color palettes using machine learning services wrapped in an Express API.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=900',
    category: 'AI & ML',
    technologies: ['React', 'Node.js', 'OpenAI API', 'Tailwind CSS', 'Express'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://neurovision-demo.example.com',
    featured: true,
    order: 3,
  },
  {
    title: 'DevPulse - Developer Social Network & Code Share',
    description: 'Community network for developers to showcase repositories, share code snippets, and collaborate on open-source ideas.',
    fullDescription: 'DevPulse connects developers around the globe. Users can integrate their GitHub profiles, publish code gists, follow developer feeds, and upvote innovative tech stacks.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900',
    category: 'Frontend',
    technologies: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'GitHub API'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://devpulse-demo.example.com',
    featured: false,
    order: 4,
  },
  {
    title: 'CryptoTracker Pro - Real-Time Crypto Analytics',
    description: 'Live cryptocurrency dashboard monitoring live prices, candlestick charts, portfolio valuations, and price alerts.',
    fullDescription: 'CryptoTracker Pro pulls WebSocket live streams from CoinGecko & Binance APIs to display real-time market movements, interactive SVG charts, historical logs, and custom watchlists.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=900',
    category: 'Frontend',
    technologies: ['React', 'Chart.js', 'Tailwind CSS', 'REST API', 'WebSockets'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://cryptotracker-demo.example.com',
    featured: false,
    order: 5,
  },
  {
    title: 'FlowMicro - Microservices Auth & Gateway Suite',
    description: 'High-throughput Node.js API Gateway with OAuth2, rate limiting, JWT validation, and Redis caching middleware.',
    fullDescription: 'FlowMicro provides a lightweight backend gateway template supporting automated route distribution, JWT key rotation, Redis caching layer, and Request metrics logger.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=900',
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'Redis', 'MongoDB', 'Docker', 'JWT'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://flowmicro-api.example.com',
    featured: false,
    order: 6,
  },
];

const initialSkills = [
  // Frontend
  { name: 'React.js', category: 'Frontend', proficiency: 95, iconName: 'Code2', featured: true },
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 92, iconName: 'FileCode', featured: true },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, iconName: 'Palette', featured: true },
  { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 95, iconName: 'Layout', featured: true },
  { name: 'Redux Toolkit', category: 'Frontend', proficiency: 85, iconName: 'Layers', featured: true },
  { name: 'Framer Motion', category: 'Frontend', proficiency: 88, iconName: 'Sparkles', featured: true },

  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 90, iconName: 'Server', featured: true },
  { name: 'Express.js', category: 'Backend', proficiency: 92, iconName: 'Cpu', featured: true },
  { name: 'RESTful APIs', category: 'Backend', proficiency: 95, iconName: 'Globe', featured: true },
  { name: 'JWT Authentication', category: 'Backend', proficiency: 88, iconName: 'ShieldCheck', featured: true },

  // Database
  { name: 'MongoDB / Mongoose', category: 'Database', proficiency: 90, iconName: 'Database', featured: true },
  { name: 'SQL', category: 'Database', proficiency: 80, iconName: 'Table', featured: true },

  // Tools
  { name: 'Git & GitHub', category: 'Tools', proficiency: 92, iconName: 'GitCommit', featured: true },
  { name: 'Postman / API Testing', category: 'Tools', proficiency: 90, iconName: 'Send', featured: true },
  { name: 'Vercel / Render', category: 'Tools', proficiency: 88, iconName: 'Cloud', featured: true },
];

const initialCertificates = [
  {
    title: 'Full-Stack Web Development Certification',
    issuer: 'Coursera / Meta',
    issueDate: '2023',
    credentialId: 'FS-DEV-86299',
    credentialUrl: 'https://coursera.org/verify/example',
    image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive program covering React.js, Node.js, Express.js, MongoDB, RESTful APIs, and cloud deployment.',
  },
  {
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    issueDate: '2023',
    credentialId: 'MDB-DEV-90640',
    credentialUrl: 'https://university.mongodb.com/verify/example',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    description: 'Validated expertise in MongoDB schema design, aggregation pipelines, performance indexing, and CRUD architecture.',
  },
];

const initialMessages = [
  {
    name: 'Sample Recruiter',
    email: 'hr@techcompany.com',
    subject: 'Full Stack Developer Opportunity',
    message: 'Hi Rudra Pratap! Impressive portfolio. We have an opening for a Full Stack Developer role.',
    read: false,
    createdAt: new Date(),
  },
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(mongoURI);

    console.log('Clearing old database records...');
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Certificate.deleteMany({});
    await Message.deleteMany({});

    console.log('Seeding Admin User...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    await User.create({
      name: 'Rudra Pratap Singh Bhadoriya',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    console.log('Seeding Profile...');
    await Profile.create(initialProfile);

    console.log('Seeding Projects...');
    await Project.insertMany(initialProjects);

    console.log('Seeding Skills...');
    await Skill.insertMany(initialSkills);

    console.log('Seeding Certificates...');
    await Certificate.insertMany(initialCertificates);

    console.log('Seeding Sample Messages...');
    await Message.insertMany(initialMessages);

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = {
  initialProfile,
  initialProjects,
  initialSkills,
  initialCertificates,
  initialMessages,
};
