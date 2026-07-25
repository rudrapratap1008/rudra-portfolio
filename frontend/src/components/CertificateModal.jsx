import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, Calendar, ShieldCheck } from 'lucide-react';

const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10 space-y-6 p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Image Frame */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-gray-900">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-auto max-h-[50vh] object-contain mx-auto"
            />
          </div>

          {/* Info Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
                <Award className="w-4 h-4" />
                <span>Issued by {certificate.issuer}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {certificate.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Issued: {certificate.issueDate}</span>
              </div>
              {certificate.credentialId && (
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Credential ID: {certificate.credentialId}</span>
                </div>
              )}
            </div>

            {certificate.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {certificate.description}
              </p>
            )}

            {certificate.credentialUrl && (
              <div className="pt-2">
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold shadow-md transition-all"
                >
                  <span>Verify Credential Authenticity</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CertificateModal;
