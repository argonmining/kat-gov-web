"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import ElectionCard from '../../components/ElectionCard';
import Tabs from '../../components/Tabs';

const Elections: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Current');

  const allElections = [
    { position: 'President', candidates: ['Alice', 'Bob'], votingPeriod: '2023-12-01 to 2023-12-15', status: 'Current' },
    { position: 'Vice President', candidates: ['Charlie', 'Dave'], votingPeriod: '2024-01-01 to 2024-01-15', status: 'Future' },
  ];

  const filteredElections = allElections.filter(election => election.status === selectedTab);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Elections</h1>
        <Tabs tabs={['Past', 'Current', 'Future']} onSelect={setSelectedTab} />
        <div className="mt-4 grid grid-cols-1 gap-4">
          {filteredElections.map((election, index) => (
            <ElectionCard key={index} {...election} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Elections;
