import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => (
  <div>
    <Navbar />
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center">Welcome to Kat Gov</h1>
      <div className="flex justify-center mt-4">
        <button className="bg-primary text-white px-4 py-2 rounded">Submit a Proposal</button>
      </div>
    </div>
  </div>
);

export default Home;
