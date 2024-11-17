import React from 'react';
import Navbar from '../components/Navbar';
import TreasuryTabs from '../components/TreasuryTabs';

const Treasury: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <h2 className="section-title">Treasury Management</h2>
        <div className="card">
          <TreasuryTabs />
        </div>
      </div>
    </div>
  );
};

export default Treasury;
