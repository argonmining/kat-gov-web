import React from 'react';
import Navbar from '../components/Navbar';
import TreasuryTabs from '../components/TreasuryTabs';

const Treasury: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Treasury Management</h2>
        </div>
        <div className="card">
          <TreasuryTabs />
        </div>
      </div>
    </div>
  );
};

export default Treasury;
