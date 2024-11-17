import React from 'react';
import Navbar from '../components/Navbar';

const ElectionDetail: React.FC = () => {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Election Detail</h2>
          {/* Election details go here */}
        </div>
      </div>
    </div>
  );
};

export default ElectionDetail;