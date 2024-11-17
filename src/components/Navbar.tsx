import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto flex justify-start items-center">
        <Link to="/" className="font-bold hover:underline mr-8">Kat Gov</Link>
        <div className="flex space-x-4">
          <Link to="/proposals" className="hover:underline">Proposals</Link>
          <Link to="/elections" className="hover:underline">Elections</Link>
          <Link to="/treasury" className="hover:underline">Treasury</Link>
        </div>
        <div className="flex space-x-4 ml-auto">
          <Link to="/submit-proposal" className="bg-primary text-white px-4 py-2 rounded">
            Submit Proposal
          </Link>
          <button onClick={toggleDarkMode} className="bg-primary text-white px-4 py-2 rounded">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
