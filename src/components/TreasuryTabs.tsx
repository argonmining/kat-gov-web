import React, { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const TreasuryTabs: React.FC = () => {
  const { isDarkMode } = useDarkMode();
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
    <div>
      <div className="flex border-b">
        {wallets.map((wallet) => (
          <button
            key={wallet.id}
            className={`px-4 py-2 ${activeTab === wallet.id ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab(wallet.id)}
          >
            {wallet.address}
          </button>
        ))}
      </div>
      {wallets.map((wallet) => (
        activeTab === wallet.id && (
          <table key={wallet.id} className={`min-w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md rounded-lg`}>
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {wallet.transactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <tr
                    className="hover:bg-gray-200 cursor-pointer border-b"
                    onClick={() => toggleRow(transaction.id)}
                  >
                    <td className="py-3 px-4">{transaction.amount}</td>
                    <td className="py-3 px-4">{transaction.date}</td>
                  </tr>
                  {expandedRow === transaction.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={2} className="py-4 px-4">
                        <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg`}>
                          {transaction.details}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )
      ))}
    </div>
  );
};

export default TreasuryTabs;