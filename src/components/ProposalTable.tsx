import React from 'react';

const ProposalTable: React.FC = () => {

  const proposals = [
    { id: 1, title: 'Proposal 1', status: 'Active' },
    { id: 2, title: 'Proposal 2', status: 'Pending' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {proposals.map((proposal) => (
        <div 
          key={proposal.id} 
          className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <h3 className="text-xl font-bold">{proposal.title}</h3>
          <p>Status: {proposal.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ProposalTable;