import React, { useState } from 'react';
import { Proposal, Status } from '../types';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

interface TabbedTableProps {
  proposals: Proposal[];
  statuses: Status[];
}

const TabbedTable: React.FC<TabbedTableProps> = ({ proposals, statuses }) => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const filteredProposals = activeTab === null
    ? proposals
    : proposals.filter(proposal => proposal.status === activeTab);

  return (
    <div>
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === null ? 'border-b-2 border-primary' : ''}`}
          onClick={() => setActiveTab(null)}
        >
          All
        </button>
        {statuses.map((status) => (
          <button
            key={status.id}
            className={`px-4 py-2 ${activeTab === status.id ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab(status.id ?? null)}
          >
            {status.name}
          </button>
        ))}
      </div>
      <table className={`min-w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md rounded-lg`}>
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Submit Date</th>
            <th className="py-3 px-4">Approved</th>
          </tr>
        </thead>
        <tbody>
          {filteredProposals.map((proposal) => (
            proposal.id !== undefined && (
              <React.Fragment key={proposal.id}>
                <tr
                  className="hover:bg-gray-200 cursor-pointer border-b"
                  onClick={() => toggleRow(proposal.id!)}
                >
                  <td className="py-3 px-4">
                    <Link to={`/proposals/${proposal.id}`} className="text-blue-500 hover:underline">
                      {proposal.title}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{statuses.find(status => status.id === proposal.status)?.name || 'Pending'}</td>
                  <td className="py-3 px-4">{proposal.submitdate ?? 'N/A'}</td>
                  <td className="py-3 px-4">{proposal.approved ? 'Yes' : 'No'}</td>
                </tr>
                {expandedRow === proposal.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="py-4 px-4">
                      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg`}>
                        <strong>Subtitle:</strong> {proposal.subtitle}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabbedTable;