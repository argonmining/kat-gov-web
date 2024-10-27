import React from 'react';

interface ProposalCardProps {
  id: number; // Keep this in the interface for typing purposes
  title: string;
  description: string;
  endDate: string;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ title, description, endDate }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <p className="text-sm text-gray-500">Ends on: {endDate}</p>
    </div>
  );
};

export default ProposalCard;
