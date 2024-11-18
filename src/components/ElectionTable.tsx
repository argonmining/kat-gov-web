import React from 'react';
import { Election } from '../types';

interface ElectionTableProps {
  elections: Election[];
}

const ElectionTable: React.FC<ElectionTableProps> = ({ elections }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Start Date</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">End Date</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {elections.map((election) => (
            <tr key={election.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-transform transform hover:scale-102">
              <td className="px-6 py-4 whitespace-nowrap">{election.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{election.startDate ? new Date(election.startDate).toLocaleDateString() : 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{election.endDate ? new Date(election.endDate).toLocaleDateString() : 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{election.description || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElectionTable; 