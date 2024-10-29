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
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Approve</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Reject</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Schedule</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Burn</button>
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">DropGas</button>
                </div>
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
                  <button className="bg-primary text-white px-4 py-2 rounded flex-1 mx-1">Delete Comment</button>
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
