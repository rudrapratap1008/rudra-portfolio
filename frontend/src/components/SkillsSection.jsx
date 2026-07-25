import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Cpu, Code2, Server, Database, Wrench, Layers } from 'lucide-react';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

const SkillsSection = ({ skills = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.Code;
    return <IconComponent className="w-6 h-6 text-cyan-400" />;
  };

  const getBadgeColor = (proficiency) => {
    if (proficiency >= 90) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    if (proficiency >= 80) return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
  };

  const getProficiencyLabel = (proficiency) => {
    if (proficiency >= 92) return 'Expert';
    if (proficiency >= 85) return 'Advanced';
    return 'Proficient';
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Technical <span className="text-gradient">Proficiency</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Core technologies, frameworks, and developer tools I leverage to build enterprise-grade software.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                  : 'glass-card text-gray-600 dark:text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gray-900/60 border border-white/10 group-hover:scale-110 transition-transform">
                    {renderIcon(skill.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${getBadgeColor(
                    skill.proficiency
                  )}`}
                >
                  {getProficiencyLabel(skill.proficiency)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-500 dark:text-gray-400">Proficiency</span>
                  <span className="text-cyan-400 font-bold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
