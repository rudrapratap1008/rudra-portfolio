import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, Download, CheckCircle2, Calendar, Building, MapPin } from 'lucide-react';

const AboutSection = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('bio');

  const name = profile?.name || 'Rudra Pratap Singh Bhadoriya';
  const bio = profile?.bio || "I'm Rudra Pratap Singh Bhadoriya, a passionate Full Stack Web Developer who enjoys building modern, responsive, and scalable web applications. I specialize in React.js, Node.js, Express.js, and MongoDB. I love solving real-world problems through clean code and continuously learning new technologies to improve my development skills.";
  const experience = profile?.experience || [];
  const education = profile?.education || [];
  const resumeUrl = profile?.resumeUrl || '/resume.pdf';

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Getting To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Dedicated Full Stack Web Developer focused on crafting performant, scalable, and responsive web applications.
          </p>
        </div>

        {/* Stats Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Years Experience', value: `${profile?.yearsOfExperience || 2}+` },
            { label: 'Projects Completed', value: `${profile?.projectsCompleted || 15}+` },
            { label: 'Satisfied Clients', value: `${profile?.happyClients || 12}+` },
            { label: 'Code Quality', value: '100%' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="glass-card p-1.5 rounded-2xl flex items-center gap-2 border border-gray-200 dark:border-white/10">
            {[
              { id: 'bio', label: 'Biography', icon: User },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-4xl mx-auto">
          {/* Tab 1: Biography */}
          {activeTab === 'bio' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-3xl border border-white/10 space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Full Stack Web Developer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {bio}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email: {profile?.email || 'Rudrapratap.86299@gmail.com'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status: Available for Opportunities
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <a
                  href={resumeUrl}
                  download="Rudra_Pratap_Singh_Bhadoriya_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Work Experience */}
          {activeTab === 'experience' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {experience.map((exp, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                        {exp.role}
                      </h4>
                      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-500">
                        <Building className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-medium self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.skillsUsed && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skillsUsed.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Tab 3: Education */}
          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {education.map((edu, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h4>
                      <div className="text-sm font-semibold text-cyan-500">
                        {edu.institution}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono font-medium self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  {edu.grade && (
                    <div className="text-xs font-mono text-emerald-400 mb-2 font-semibold">
                      {edu.grade}
                    </div>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
