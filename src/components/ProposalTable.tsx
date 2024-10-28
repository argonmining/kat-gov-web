import React from 'react';

const ProposalTable: React.FC = () => {
  // Mock data for demonstration
  const proposals = [
    { id: 1, title: 'Proposal 1', status: 'Active' },
    { id: 2, title: 'Proposal 2', status: 'Pending' },
  ];

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Title</th>
          <th className="py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {proposals.map((proposal) => (
          <tr key={proposal.id} className="hover:bg-gray-100">
            <td className="py-2">{proposal.title}</td>
            <td className="py-2">{proposal.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProposalTable;
