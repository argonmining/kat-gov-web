import React from 'react';
import Navbar from '../components/Navbar';
import ElectionCard from '../components/ElectionCard';

const Elections: React.FC = () => (
  <div>
    <Navbar />
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold">Elections</h2>
      <ElectionCard />
    </div>
  </div>
);

export default Elections;
