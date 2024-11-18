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
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Subtitle</h4>
                <p className="text-gray-600 dark:text-gray-400">{proposal.description || 'No subtitle provided'}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Type</h4>
                <p className="text-gray-600 dark:text-gray-400">N/A</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Reviewed</h4>
                <p className="text-gray-600 dark:text-gray-400">No</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Open Vote Date</h4>
                <p className="text-gray-600 dark:text-gray-400">N/A</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Close Vote Date</h4>
                <p className="text-gray-600 dark:text-gray-400">N/A</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Votes Active</h4>
                <p className="text-gray-600 dark:text-gray-400">No</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Passed</h4>
                <p className="text-gray-600 dark:text-gray-400">No</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProposalTable;