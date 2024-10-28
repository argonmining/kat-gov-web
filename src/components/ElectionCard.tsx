import React from 'react';

const ElectionCard: React.FC = () => {
  // Mock data for demonstration
  const elections = [
    { id: 1, title: 'Election 1', date: '2023-10-01' },
    { id: 2, title: 'Election 2', date: '2023-11-01' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {elections.map((election) => (
        <div key={election.id} className="bg-white p-4 shadow-md">
          <h3 className="font-bold">{election.title}</h3>
          <p>{election.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ElectionCard;
