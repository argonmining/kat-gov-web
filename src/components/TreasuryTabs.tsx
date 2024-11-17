import React, { useState } from 'react';

const TreasuryTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const wallets = [
    {
      id: 1,
      address: 'kaspa1...',
      transactions: [
        { id: 1, amount: '100', date: '2023-10-01', details: 'Detailed information about transaction 1' },
        { id: 2, amount: '250', date: '2023-10-02', details: 'Detailed information about transaction 2' },
        { id: 3, amount: '300', date: '2023-10-03', details: 'Detailed information about transaction 3' },
      ],
    },
    {
      id: 2,
      address: 'kaspa2...',
      transactions: [
        { id: 4, amount: '400', date: '2023-10-04', details: 'Detailed information about transaction 4' },
        { id: 5, amount: '500', date: '2023-10-05', details: 'Detailed information about transaction 5' },
        { id: 6, amount: '600', date: '2023-10-06', details: 'Detailed information about transaction 6' },
      ],
    },
  ];

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
        {wallets.map((wallet) => (
          <button
            key={wallet.id}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-200
              ${activeTab === wallet.id 
                ? 'bg-primary text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab(wallet.id)}
          >
            {wallet.address}
          </button>
        ))}
      </div>

      {/* Table */}
      {wallets.map((wallet) => (
        activeTab === wallet.id && (
          <div key={wallet.id} className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {wallet.transactions.map((transaction) => (
                  <React.Fragment key={transaction.id}>
                    <tr
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                      onClick={() => toggleRow(transaction.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-primary font-medium">{transaction.amount} KAS</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                        {transaction.date}
                      </td>
                    </tr>
                    {expandedRow === transaction.id && (
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td colSpan={2} className="px-6 py-4">
                          <div className="card">
                            <h4 className="font-medium mb-2">Transaction Details</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              {transaction.details}
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
        )
      ))}
    </div>
  );
};

export default TreasuryTabs;