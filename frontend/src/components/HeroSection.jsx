import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, Code, Terminal, Sparkles } from 'lucide-react';

const roles = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'React Developer',
  'Node.js Developer',
];

const HeroSection = ({ profile }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetRole = roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === targetRole) {
      typingSpeed = 2000;
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 300;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(targetRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === targetRole.length) {
          setIsDeleting(true);
        }
      } else {
        setDisplayText(targetRole.substring(0, displayText.length - 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const name = profile?.name || 'Rudra Pratap Singh Bhadoriya';
  const avatar = profile?.avatarUrl || '/profile.jpeg';
  const resumeUrl = profile?.resumeUrl || '/resume.pdf';
  const githubUrl = profile?.githubUrl || 'https://github.com/rudrapratap1008';
  const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/rudra-pratap-singh-bhadoriya-98b829379';

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Glowing Orbs */}
      <div className="bg-blob w-96 h-96 bg-cyan-500 top-20 -left-20" />
      <div className="bg-blob w-96 h-96 bg-purple-600 top-1/3 -right-20" />
      <div className="bg-blob w-80 h-80 bg-indigo-500 bottom-10 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Introduction & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide shadow-glow-primary">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span>Available for Full-time Roles & Freelance</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Hi, I'm <span className="text-gradient">{name}</span>
            </h1>

            {/* Animated Typing Role */}
            <div className="h-12 flex items-center justify-center lg:justify-start">
              <p className="text-xl sm:text-2xl font-mono text-gray-700 dark:text-gray-300">
                I am a <span className="text-cyan-400 font-semibold">{displayText}</span>
                <span className="animate-pulse text-cyan-400">|</span>
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Passionate Full Stack Web Developer who enjoys building modern, responsive, and scalable web applications specializing in React.js, Node.js, Express.js, and MongoDB.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={resumeUrl}
                download="Rudra_Pratap_Singh_Bhadoriya_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-card text-gray-800 dark:text-white font-semibold hover:bg-white/20 dark:hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-card text-cyan-400 hover:text-cyan-300 hover:border-cyan-400/50 transition-all duration-300 text-sm font-medium"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Connect:</span>
              <div className="flex items-center gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl glass-card text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:scale-110 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl glass-card text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${profile?.email || 'Rudrapratap.86299@gmail.com'}`}
                  aria-label="Email"
                  className="p-3 rounded-xl glass-card text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:scale-110 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Graphic / Avatar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96">
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-indigo-600 blur-xl opacity-50 animate-pulse-slow" />
              
              {/* Card Container */}
              <div className="relative w-full h-full rounded-3xl glass-card p-3 overflow-hidden border border-white/20 shadow-2xl flex flex-col items-center justify-center">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover object-top rounded-2xl shadow-inner filter brightness-105"
                />

                {/* Overlay Floating Tech Badges */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl backdrop-blur-md flex items-center justify-between border border-white/20">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Full-Stack Developer</div>
                      <div className="text-[10px] font-mono text-cyan-300">React • Node • Express • MongoDB</div>
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>

              {/* Top Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 glass-card px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-cyan-500/30"
              >
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-gray-800 dark:text-white">MERN Stack</span>
              </motion.div>

              {/* Right Floating Badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 -right-4 glass-card px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-purple-500/30"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-gray-800 dark:text-white">Full Stack Dev</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
