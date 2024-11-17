import React from 'react';
import { Link } from 'react-router-dom';

interface Proposal {
  id: number;
  title: string;
  status: string;
  description?: string;
}

const ProposalTable: React.FC = () => {
  const proposals: Proposal[] = [
    { 
      id: 1, 
      title: 'Proposal 1', 
      status: 'Active',
      description: 'This is a description for proposal 1'
    },
    { 
      id: 2, 
      title: 'Proposal 2', 
      status: 'Pending',
      description: 'This is a description for proposal 2'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 animate-fadeIn">
      {proposals.map((proposal) => (
        <Link 
          key={proposal.id}
          to={`/proposals/${proposal.id}`}
          className="card hover:scale-[1.01] transition-transform duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">{proposal.title}</h3>
              {proposal.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {proposal.description}
                </p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${proposal.status === 'Active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}
            >
              {proposal.status}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProposalTable;