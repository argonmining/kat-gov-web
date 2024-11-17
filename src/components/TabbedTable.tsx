import React, { useState } from 'react';
import { Proposal, Status } from '../types';
import { Link } from 'react-router-dom';

interface TabbedTableProps {
  proposals: Proposal[];
  statuses: Status[];
}

const TabbedTable: React.FC<TabbedTableProps> = ({ proposals, statuses }) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const filteredProposals = activeTab === null
    ? proposals
    : proposals.filter((proposal) => proposal.status === activeTab);

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 -mb-px
            ${activeTab === null 
              ? 'bg-primary text-white' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          onClick={() => setActiveTab(null)}
        >
          All
        </button>
        {statuses.map((status) => (
          <button
            key={status.id}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 -mb-px
              ${activeTab === status.id 
                ? 'bg-primary text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab(status.id ?? null)}
          >
            {status.name}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Submit Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Approved
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProposals.map((proposal) => (
              <React.Fragment key={proposal.id}>
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleRow(proposal.id!)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/proposals/${proposal.id}`} 
                      className="text-primary hover:text-primary-dark transition-colors duration-200"
                    >
                      {proposal.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                      {statuses.find((status) => status.id === proposal.status)?.name || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {proposal.submitdate ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${proposal.approved 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                    >
                      {proposal.approved ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
                {expandedRow === proposal.id && (
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="card">
                        <h4 className="font-medium mb-2">Subtitle</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {proposal.subtitle || 'No subtitle provided'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabbedTable;
