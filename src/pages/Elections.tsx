import React from 'react';
import Navbar from '../components/Navbar';
import ElectionCard from '../components/ElectionCard';

const Elections: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Elections</h2>
          <button className="button-primary">
            Create Election
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h4 className="text-xl font-bold mb-4">Current Election Status</h4>
            <div className="space-y-3">
              <p className="flex justify-between">
                <span>Phase:</span>
                <span className="font-medium">Nomination</span>
              </p>
              <p className="flex justify-between">
                <span>Start Date:</span>
                <span className="font-medium">TBD</span>
              </p>
              <p className="flex justify-between">
                <span>End Date:</span>
                <span className="font-medium">TBD</span>
              </p>
            </div>
          </div>
          <div className="card">
            <h4 className="text-xl font-bold mb-4">Participation</h4>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-4">
              <div
                className="bg-primary h-6 rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              ></div>
            </div>
            <p className="text-center font-medium">0% of eligible voters participated</p>
          </div>
        </div>

        <div className="card">
          <ElectionCard />
        </div>
      </div>
    </div>
  );
};

export default Elections;