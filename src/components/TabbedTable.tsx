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
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedProposals = [...proposals].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn as keyof Proposal] ?? '';
    const bValue = b[sortColumn as keyof Proposal] ?? '';
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredProposals = activeTab === null
    ? sortedProposals
    : sortedProposals.filter((proposal) => proposal.status === activeTab);

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 -mb-px
            ${activeTab === null 
              ? 'bg-gradient-to-r from-primary to-secondary text-white' 
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
                ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab(status.id ?? null)}
          >
            {status.name}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('title')}
              >
                Title
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('submitted')}
              >
                Submit Date
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('reviewed')}
              >
                Reviewed
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('approved')}
              >
                Qualified
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProposals.map((proposal) => (
              <React.Fragment key={proposal.id}>
                <tr
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-transform transform hover:scale-102"
                  onClick={() => proposal.id !== undefined && toggleRow(proposal.id)}
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
                      {statuses.find((status) => status.id === proposal.status)?.name || 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {proposal.submitted ? new Date(proposal.submitted).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${proposal.reviewed 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                    >
                      {proposal.reviewed ? 'Yes' : 'No'}
                    </span>
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
                    <td colSpan={5} className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Subtitle</h4>
                          <p className="text-gray-600 dark:text-gray-400">{proposal.subtitle || 'No subtitle provided'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Type</h4>
                          <p className="text-gray-600 dark:text-gray-400">{proposal.type || 'N/A'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Reviewed</h4>
                          <p className="text-gray-600 dark:text-gray-400">{proposal.reviewed ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Open Vote Date</h4>
                          <p className="text-gray-600 dark:text-gray-400">{proposal.openvote ? new Date(proposal.openvote).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Close Vote Date</h4>
                          <p className="text-gray-600 dark:text-gray-400">{proposal.closevote ? new Date(proposal.closevote).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Votes Active</h4>
                          <p className="text-gray-600 dark:text-gray-400">{proposal.votesActive ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Passed</h4>
                          <p className="text-gray-600 dark:text-gray-400">{proposal.passed ? 'Yes' : 'No'}</p>
                        </div>
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
