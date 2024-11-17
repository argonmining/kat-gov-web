import React from 'react';
import Navbar from '../components/Navbar';
import ElectionCard from '../components/ElectionCard';

const Elections: React.FC = () => {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-6">Elections</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ElectionCard />
        </div>
      </div>
    </div>
  );
};

export default Elections;