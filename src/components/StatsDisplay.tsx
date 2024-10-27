import React from 'react';

interface StatsDisplayProps {
  proposalsCount: number;
  votesCount: number;
  electionsCount: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ proposalsCount, votesCount, electionsCount }) => {
  return (
    <div className="flex space-x-4 p-4 bg-gray-100 rounded shadow-md">
      <div className="text-center">
        <h2 className="text-xl font-bold">{proposalsCount}</h2>
        <p>Proposals</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">{votesCount}</h2>
        <p>Votes</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">{electionsCount}</h2>
        <p>Elections</p>
      </div>
    </div>
  );
};

export default StatsDisplay;

