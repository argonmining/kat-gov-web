import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold">Kat Gov</div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/proposals" className="hover:underline">Proposals</Link>
          <Link to="/elections" className="hover:underline">Elections</Link>
          <Link to="/treasury" className="hover:underline">Treasury</Link>
        </div>
        <button onClick={toggleDarkMode} className="bg-blue-500 text-white px-4 py-2 rounded">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
