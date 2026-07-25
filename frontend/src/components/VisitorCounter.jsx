import React from 'react';
import { Eye, Activity } from 'lucide-react';

const VisitorCounter = ({ count = 1420 }) => {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl glass-card border border-white/10 text-xs font-mono">
      <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
        <Eye className="w-4 h-4 animate-pulse" />
        <span>Total Visitors:</span>
      </div>
      <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
        {count.toLocaleString()}
      </span>
    </div>
  );
};

export default VisitorCounter;
