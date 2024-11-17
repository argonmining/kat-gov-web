import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-center">Welcome to Kat Gov</h1>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/proposals"
              className="p-6 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg rounded-lg text-center transform hover:scale-105 transition"
            >
              <h3 className="font-bold text-lg">View Proposals</h3>
            </a>
            <a
              href="/submit-proposal"
              className="p-6 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg rounded-lg text-center transform hover:scale-105 transition"
            >
              <h3 className="font-bold text-lg">Submit Proposal</h3>
            </a>
            <a
              href="/elections"
              className="p-6 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg rounded-lg text-center transform hover:scale-105 transition"
            >
              <h3 className="font-bold text-lg">View Elections</h3>
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Governance Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
              <h3 className="font-bold text-lg">Active Proposals</h3>
              <p className="text-xl font-semibold">0</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
              <h3 className="font-bold text-lg">Active Elections</h3>
              <p className="text-xl font-semibold">0</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
              <h3 className="font-bold text-lg">Total Votes</h3>
              <p className="text-xl font-semibold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
