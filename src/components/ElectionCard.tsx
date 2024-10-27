import React from 'react';

interface ElectionCardProps {
  position: string;
  candidates: string[];
  votingPeriod: string;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ position, candidates, votingPeriod }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{position}</h2>
      <p className="text-gray-700">Candidates: {candidates.join(', ')}</p>
      <p className="text-sm text-gray-500">Voting Period: {votingPeriod}</p>
    </div>
  );
};

export default ElectionCard;

