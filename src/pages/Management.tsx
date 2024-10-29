import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TabbedTable from '../components/TabbedTable';
import ElectionCard from '../components/ElectionCard';
import { getProposals, getStatuses } from '../services/apiService';
import { Proposal, Status } from '../types';

const Management: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'proposals' | 'elections' | 'treasury'>('proposals');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      const data = await getProposals();
      setProposals(data);
    };

    const fetchStatuses = async () => {
      const data = await getStatuses();
      setStatuses(data);
    };

    fetchProposals();
    fetchStatuses();
  }, []);

  const handleLogin = () => {
    const managementPassword = 'KatGov!2024';
    if (password === managementPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const renderActionContent = () => {
    switch (activeAction) {
      case 'approve':
      case 'reject':
        return (
          <div className="mb-4">
            <select className="border p-2 mr-2">
              {proposals
                .filter(p => p.status === 2 || p.status === 3)
                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
            </select>
            <select className="border p-2 mr-2">
              {statuses.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <button className="bg-primary text-white px-4 py-2 rounded">
              {activeAction === 'approve' ? 'Approve' : 'Reject'}
            </button>
          </div>
        );
      case 'schedule':
        return (
          <div className="mb-4">
            <select className="border p-2 mr-2">
              {proposals
                .filter(p => p.status === 4 || p.status === 5)
                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
            </select>
            <input type="datetime-local" className="border p-2 mr-2" />
            <button className="bg-primary text-white px-4 py-2 rounded">Schedule</button>
          </div>
        );
      case 'burn':
        return (
          <div className="mb-4">
            <select className="border p-2 mr-2">
              {proposals.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <select className="border p-2 mr-2">
              <option>Burn Proposal Wallet</option>
              <option>Burn YES Wallet</option>
              <option>Burn NO Wallet</option>
            </select>
            <button className="bg-primary text-white px-4 py-2 rounded">Burn</button>
          </div>
        );
      case 'dropGas':
        return (
          <div className="mb-4">
            <select className="border p-2 mr-2">
              {proposals.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <select className="border p-2 mr-2">
              <option>Drop to Proposal Wallet</option>
              <option>Drop to YES Wallet</option>
              <option>Drop to NO Wallet</option>
            </select>
            <button className="bg-primary text-white px-4 py-2 rounded">DropGas</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        {isAuthenticated ? (
          <div>
            <div className="flex mb-4">
              <button
                className={`px-4 py-2 ${activeTab === 'proposals' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('proposals')}
              >
                Proposals
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'elections' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('elections')}
              >
                Elections
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'treasury' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('treasury')}
              >
                Treasury
              </button>
            </div>
            {activeTab === 'proposals' && (
              <div>
                <div className="flex justify-between mb-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1"
                    onClick={() => setActiveAction('approve')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1"
                    onClick={() => setActiveAction('reject')}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1"
                    onClick={() => setActiveAction('schedule')}
                  >
                    Schedule
                  </button>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1"
                    onClick={() => setActiveAction('burn')}
                  >
                    Burn
                  </button>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1"
                    onClick={() => setActiveAction('dropGas')}
                  >
                    DropGas
                  </button>
                </div>
                {renderActionContent()}
                <TabbedTable proposals={proposals} statuses={statuses} />
              </div>
            )}
            {activeTab === 'elections' && (
              <div>
                <div className="flex justify-between mb-4">
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">New</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Review</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Schedule</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Burn</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">DropGas</button>
                </div>
                <ElectionCard />
              </div>
            )}
            {activeTab === 'treasury' && (
              <div>
                <div className="flex justify-between mb-4">
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Manage Wallets</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Add Comment</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Edit Comment</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Update Transactions</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Balance Check</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-sm mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Enter Management Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Password"
            />
            <button onClick={handleLogin} className="bg-primary text-white px-4 py-2 rounded">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
