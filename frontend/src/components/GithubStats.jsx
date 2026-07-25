import React from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, GitBranch, Star, Code, ArrowUpRight } from 'lucide-react';

const GithubStats = ({ githubUrl = 'https://github.com' }) => {
  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-gray-900/90 shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Github className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">GitHub Activity Snapshot</h3>
                <p className="text-sm text-gray-400 font-mono">Open source contributions & repository activity</p>
              </div>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold shadow-lg transition-all"
            >
              <span>Visit GitHub Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-gray-800">
            {[
              { icon: GitCommit, label: 'Annual Commits', value: '1,240+' },
              { icon: GitBranch, label: 'Public Repos', value: '38' },
              { icon: Star, label: 'Repository Stars', value: '185+' },
              { icon: Code, label: 'Top Tech', value: 'JavaScript / React' },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubStats;
