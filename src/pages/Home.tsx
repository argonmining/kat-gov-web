import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => (
  <div>
    <Navbar />
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center">Welcome to Kat Gov</h1>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/proposals" className="p-4 bg-white shadow rounded-lg text-center hover:bg-gray-100">
            <h3 className="font-bold">View Proposals</h3>
          </a>
          <a href="/submit-proposal" className="p-4 bg-white shadow rounded-lg text-center hover:bg-gray-100">
            <h3 className="font-bold">Submit Proposal</h3>
          </a>
          <a href="/elections" className="p-4 bg-white shadow rounded-lg text-center hover:bg-gray-100">
            <h3 className="font-bold">View Elections</h3>
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Governance Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <h3 className="font-bold">Active Proposals</h3>
            <p>0</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <h3 className="font-bold">Active Elections</h3>
            <p>0</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <h3 className="font-bold">Total Votes</h3>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
