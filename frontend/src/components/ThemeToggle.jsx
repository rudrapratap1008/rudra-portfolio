import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="p-2.5 rounded-xl glass-card text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-500 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-500 rotate-0 hover:-rotate-45" />
      )}
    </button>
  );
};

export default ThemeToggle;
