import React, { useState } from 'react';
import { Proposal } from '../types'; // Import the Proposal type

interface TabbedTableProps {
  proposals: Proposal[];
}

const TabbedTable: React.FC<TabbedTableProps> = ({ proposals }) => {
  const [activeTab, setActiveTab] = useState('All Proposals');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const tabs = ['All Proposals', 'Submitted', 'Active', 'Completed'];

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <table className="min-w-full bg-white mt-4 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">% of Total</th>
          </tr>
        </thead>
        <tbody>
          {proposals
            .filter((proposal) => activeTab === 'All Proposals' || proposal.status === activeTab)
            .map((proposal) => (
              <React.Fragment key={proposal.id}>
                <tr
                  className="hover:bg-gray-200 cursor-pointer border-b"
                  onClick={() => toggleRow(proposal.id!)}
                >
                  <td className="py-3 px-4">{proposal.title}</td>
                  <td className="py-3 px-4">{proposal.status}</td>
                  <td className="py-3 px-4">{proposal.amount}</td>
                  <td className="py-3 px-4">{proposal.percentage}</td>
                </tr>
                {expandedRow === proposal.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="py-4 px-4">
                      <div className="p-4 bg-white shadow rounded-lg">
                        {proposal.details}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabbedTable;
