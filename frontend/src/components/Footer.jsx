import React from 'react';
import { Code2, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Footer = ({ profile, visitorCount }) => {
  const name = profile?.name || 'Rudra Pratap Singh Bhadoriya';

  return (
    <footer className="relative z-10 border-t border-gray-200 dark:border-white/10 bg-gray-100/50 dark:bg-gray-950/50 backdrop-blur-md pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-gray-200 dark:border-gray-800">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-gray-900 dark:text-white">
                {name}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 max-w-sm">
              Full Stack Web Developer crafting high performance web applications with modern design systems and REST APIs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-wrap gap-4 text-xs font-mono text-gray-600 dark:text-gray-400">
            <a href="#hero" className="hover:text-cyan-400">Home</a>
            <a href="#about" className="hover:text-cyan-400">About</a>
            <a href="#skills" className="hover:text-cyan-400">Skills</a>
            <a href="#projects" className="hover:text-cyan-400">Projects</a>
            <a href="#certificates" className="hover:text-cyan-400">Certificates</a>
            <a href="#contact" className="hover:text-cyan-400">Contact</a>
          </div>

          {/* Visitor Counter */}
          <div className="md:col-span-3 flex justify-start md:justify-end">
            <VisitorCounter count={visitorCount} />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>using React & Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
