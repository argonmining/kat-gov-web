"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import StatsDisplay from '../components/StatsDisplay';

const Home: React.FC = () => {
  const proposalsCount = 10; // Example data
  const votesCount = 100; // Example data
  const electionsCount = 5; // Example data

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Welcome to Kat Gov</h1>
        <p>This is the homepage of the Kat Gov governance platform.</p>
        <StatsDisplay proposalsCount={proposalsCount} votesCount={votesCount} electionsCount={electionsCount} />
      </main>
    </div>
  );
};

export default Home;
