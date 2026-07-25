import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Eye, Calendar } from 'lucide-react';
import CertificateModal from './CertificateModal';

const CertificatesSection = ({ certificates = [] }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Certificates & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Professional certifications, tech specializations, and industry qualifications.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col group hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative h-48 w-full overflow-hidden bg-gray-900 cursor-pointer"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                
                {/* Hover overlay indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-gray-900/50 backdrop-blur-xs transition-opacity">
                  <span className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg">
                    <Eye className="w-4 h-4" />
                    Preview Certificate
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{cert.issuer}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  {cert.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-xs mt-2 line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {cert.issueDate}
                  </span>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View Image</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Window */}
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />

      </div>
    </section>
  );
};

export default CertificatesSection;
