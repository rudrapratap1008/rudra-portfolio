import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Calendar, Star } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Hero Image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider border border-cyan-500/30">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Tech Pills */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Technologies Used</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 text-xs font-mono border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">About the Project</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Action Links */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-4">
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-gray-800 dark:text-white font-semibold hover:border-cyan-400/50 hover:scale-105 transition-transform"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
