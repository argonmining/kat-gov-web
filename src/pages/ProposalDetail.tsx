import React from 'react';
import Navbar from '../components/Navbar';

const ProposalDetail: React.FC = () => (
  <div>
    <Navbar />
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold">Proposal Detail</h2>
      {/* Proposal details go here */}
    </div>
  </div>
);

export default ProposalDetail;
