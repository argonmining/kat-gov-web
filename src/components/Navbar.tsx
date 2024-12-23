import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const projectName = process.env.REACT_APP_GOV_PROJECT_NAME || 'Governance';

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            {projectName}
          </Link>
          <div className="hidden md:flex space-x-2">
            <Link to="/proposals" className="nav-link">Proposals</Link>
            <Link to="/elections" className="nav-link">Elections</Link>
            <Link to="/treasury" className="nav-link">Treasury</Link>
            <Link to="/management" className="nav-link">Management</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            to="/submit-proposal" 
            className="button-primary hidden md:block"
          >
            Submit Proposal
          </Link>
          <button 
            onClick={toggleDarkMode} 
            className="button-secondary"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
