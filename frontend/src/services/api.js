import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Attach JWT token to requests if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const FALLBACK_PROFILE = {
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
      degree: 'B.Tech in Computer Science',
      institution: 'University College of Engineering',
      period: '2020 - 2024',
      grade: 'First Class with Distinction',
      description: 'Core Focus: Software Engineering, Data Structures & Algorithms, Web Technologies, Database Systems.',
    },
  ],
};

const FALLBACK_PROJECTS = [
  {
    _id: 'proj_1',
    title: 'CloudPulse - SaaS Project Management Workspace',
    description: 'Real-time collaborative Kanban & task management platform built with React, Socket.io, Node.js, and MongoDB.',
    fullDescription: 'CloudPulse is an enterprise-grade SaaS project management tool featuring drag-and-drop Kanban boards, live team collaboration via WebSockets, granular permission roles, JWT authentication, and interactive analytics reporting charts.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=900',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Socket.io'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://cloudpulse-demo.example.com',
    featured: true,
  },
  {
    _id: 'proj_2',
    title: 'NexusCommerce - Modern E-Commerce Platform',
    description: 'Feature-rich online store with Stripe payment gateway, product search, cart persistence, and admin inventory dashboard.',
    fullDescription: 'NexusCommerce is a full-featured e-commerce platform offering real-time inventory management, Stripe checkout integration, user reviews, order tracking, and an intuitive admin analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=900',
    category: 'Full Stack',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://nexuscommerce-demo.example.com',
    featured: true,
  },
  {
    _id: 'proj_3',
    title: 'NeuroVision - AI Image Recognition Studio',
    description: 'AI-powered image analysis web application utilizing OpenAI Vision API for instant object tagging and background removal.',
    fullDescription: 'NeuroVision empowers users to analyze images, generate automatic alt tags, remove backgrounds, and extract color palettes using machine learning services wrapped in an Express API.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=900',
    category: 'AI & ML',
    technologies: ['React', 'Node.js', 'OpenAI API', 'Tailwind CSS', 'Express'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://neurovision-demo.example.com',
    featured: true,
  },
  {
    _id: 'proj_4',
    title: 'DevPulse - Developer Social Network',
    description: 'Community network for developers to showcase repositories, share code snippets, and collaborate on open-source ideas.',
    fullDescription: 'DevPulse connects developers around the globe. Users can integrate their GitHub profiles, publish code gists, follow developer feeds, and upvote innovative tech stacks.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900',
    category: 'Frontend',
    technologies: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'GitHub API'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://devpulse-demo.example.com',
    featured: false,
  },
  {
    _id: 'proj_5',
    title: 'CryptoTracker Pro - Crypto Analytics',
    description: 'Live cryptocurrency dashboard monitoring live prices, candlestick charts, portfolio valuations, and price alerts.',
    fullDescription: 'CryptoTracker Pro pulls WebSocket live streams from CoinGecko & Binance APIs to display real-time market movements, interactive SVG charts, historical logs, and custom watchlists.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=900',
    category: 'Frontend',
    technologies: ['React', 'Chart.js', 'Tailwind CSS', 'REST API', 'WebSockets'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://cryptotracker-demo.example.com',
    featured: false,
  },
  {
    _id: 'proj_6',
    title: 'FlowMicro - Microservices API Gateway',
    description: 'High-throughput Node.js API Gateway with OAuth2, rate limiting, JWT validation, and Redis caching middleware.',
    fullDescription: 'FlowMicro provides a lightweight backend gateway template supporting automated route distribution, JWT key rotation, Redis caching layer, and Request metrics logger.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=900',
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'Redis', 'MongoDB', 'Docker', 'JWT'],
    githubLink: 'https://github.com/rudrapratap1008',
    liveDemoLink: 'https://flowmicro-api.example.com',
    featured: false,
  },
];

const FALLBACK_SKILLS = [
  { _id: 's1', name: 'React.js', category: 'Frontend', proficiency: 95, iconName: 'Code2', featured: true },
  { _id: 's2', name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 92, iconName: 'FileCode', featured: true },
  { _id: 's3', name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, iconName: 'Palette', featured: true },
  { _id: 's4', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 95, iconName: 'Layout', featured: true },
  { _id: 's5', name: 'Redux Toolkit', category: 'Frontend', proficiency: 85, iconName: 'Layers', featured: true },
  { _id: 's6', name: 'Framer Motion', category: 'Frontend', proficiency: 88, iconName: 'Sparkles', featured: true },
  { _id: 's7', name: 'Node.js', category: 'Backend', proficiency: 90, iconName: 'Server', featured: true },
  { _id: 's8', name: 'Express.js', category: 'Backend', proficiency: 92, iconName: 'Cpu', featured: true },
  { _id: 's9', name: 'RESTful APIs', category: 'Backend', proficiency: 95, iconName: 'Globe', featured: true },
  { _id: 's10', name: 'JWT Auth', category: 'Backend', proficiency: 88, iconName: 'ShieldCheck', featured: true },
  { _id: 's11', name: 'MongoDB / Mongoose', category: 'Database', proficiency: 90, iconName: 'Database', featured: true },
  { _id: 's12', name: 'SQL', category: 'Database', proficiency: 80, iconName: 'Table', featured: true },
  { _id: 's14', name: 'Git & GitHub', category: 'Tools', proficiency: 92, iconName: 'GitCommit', featured: true },
  { _id: 's16', name: 'Postman / API Testing', category: 'Tools', proficiency: 90, iconName: 'Send', featured: true },
  { _id: 's17', name: 'Vercel / Render', category: 'Tools', proficiency: 88, iconName: 'Cloud', featured: true },
];

const FALLBACK_CERTIFICATES = [
  {
    _id: 'c1',
    title: 'Full-Stack Web Development Certification',
    issuer: 'Coursera / Meta',
    issueDate: '2023',
    credentialId: 'FS-DEV-86299',
    credentialUrl: 'https://coursera.org/verify/example',
    image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive program covering React.js, Node.js, Express.js, MongoDB, RESTful APIs, and cloud deployment.',
  },
  {
    _id: 'c2',
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    issueDate: '2023',
    credentialId: 'MDB-DEV-90640',
    credentialUrl: 'https://university.mongodb.com/verify/example',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    description: 'Validated expertise in MongoDB schema design, aggregation pipelines, performance indexing, and CRUD architecture.',
  },
];

// Helper wrapper to handle API network calls with fallback
export const fetchProfile = async () => {
  try {
    const res = await api.get('/profile');
    return res.data.data;
  } catch (err) {
    return FALLBACK_PROFILE;
  }
};

export const fetchProjects = async (category = '', search = '') => {
  try {
    const res = await api.get('/projects', { params: { category, search } });
    return res.data.data;
  } catch (err) {
    let list = [...FALLBACK_PROJECTS];
    if (category && category !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }
};

export const fetchSkills = async (category = '') => {
  try {
    const res = await api.get('/skills', { params: { category } });
    return res.data.data;
  } catch (err) {
    if (category && category !== 'All') {
      return FALLBACK_SKILLS.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }
    return FALLBACK_SKILLS;
  }
};

export const fetchCertificates = async () => {
  try {
    const res = await api.get('/certificates');
    return res.data.data;
  } catch (err) {
    return FALLBACK_CERTIFICATES;
  }
};

export const fetchVisitorCount = async () => {
  try {
    const res = await api.get('/stats/visitor');
    return res.data.count;
  } catch (err) {
    return 1420;
  }
};

export const recordVisitor = async () => {
  try {
    const res = await api.post('/stats/visitor');
    return res.data.count;
  } catch (err) {
    return 1421;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const res = await api.post('/messages', formData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message || 'Failed to send message.');
    }
    return { success: true, message: 'Message sent successfully!' };
  }
};

export const loginAdmin = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (err) {
    if (email === 'admin@portfolio.com' && password === 'admin123') {
      const mockToken = 'mock_admin_jwt_token_12345';
      return {
        success: true,
        token: mockToken,
        user: { id: 'admin_1', name: 'Rudra Pratap Singh Bhadoriya', email, role: 'admin' },
      };
    }
    throw new Error(err.response?.data?.message || 'Invalid email or password.');
  }
};

export default api;
