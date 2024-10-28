import React from 'react';
import Navbar from '../components/Navbar';
import TreasuryTabs from '../components/TreasuryTabs';

const Treasury: React.FC = () => (
  <div>
    <Navbar />
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold">Treasury</h2>
      <TreasuryTabs />
    </div>
  </div>
);

export default Treasury;
