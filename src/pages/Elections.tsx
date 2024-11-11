import React from 'react';
import Navbar from '../components/Navbar';
import ElectionCard from '../components/ElectionCard';
import { useDarkMode } from '../context/DarkModeContext';

const Elections: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold">Elections</h2>
        <ElectionCard />
      </div>
    </div>
  );
};

export default Elections;