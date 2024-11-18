import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TabbedTable from '../components/TabbedTable';
import ElectionCard from '../components/ElectionCard';
import { getProposals, getStatuses, updateProposal } from '../services/apiService';
import { Proposal, Status } from '../types';
import { SHA256 } from 'crypto-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Management: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const MAX_ATTEMPTS = 5;
  const LOCK_DURATION = 5 * 60 * 1000; // 5 minutes
  const tabs = ['proposals', 'elections', 'treasury'] as const;
  type TabType = typeof tabs[number];
  const [activeTab, setActiveTab] = useState<TabType>('proposals');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [selectedProposalId, setSelectedProposalId] = useState<number | null>(null);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const [openVoteDate, setOpenVoteDate] = useState<Date | null>(null);
  const [closeVoteDate, setCloseVoteDate] = useState<Date | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

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

  const handleLogin = async () => {
    if (isLocked) {
      alert('Too many login attempts. Please try again later.');
      return;
    }

    const hashedPassword = SHA256(password).toString();
    const storedHash = process.env.REACT_APP_MANAGEMENT_PASSWORD_HASH || '';

    if (!storedHash) {
      console.error('Management password hash not found in environment variables');
      alert('Configuration error. Please contact administrator.');
      return;
    }

    if (hashedPassword === storedHash) {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      const expirationTime = Date.now() + (30 * 60 * 1000);
      sessionStorage.setItem('mgmt_auth', '1');
      sessionStorage.setItem('mgmt_auth_expiry', expirationTime.toString());
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setLoginAttempts(0);
        }, LOCK_DURATION);
      }
      
      alert('Incorrect password');
    }
    setPassword('');
  };

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem('mgmt_auth') === '1';
      const expiryTime = sessionStorage.getItem('mgmt_auth_expiry');
      
      if (isAuth && expiryTime) {
        const now = Date.now();
        if (now < parseInt(expiryTime)) {
          setIsAuthenticated(true);
        } else {
          // Clear expired session
          sessionStorage.removeItem('mgmt_auth');
          sessionStorage.removeItem('mgmt_auth_expiry');
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();

    // Check auth status every minute
    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleApproveReject = async (approved: boolean) => {
    if (selectedProposalId !== null && selectedStatusId !== null) {
      const proposal = proposals.find(p => p.id === selectedProposalId);
      if (proposal) {
        try {
          await updateProposal(selectedProposalId, {
            ...proposal,
            status: selectedStatusId,
            reviewed: true,
            approved
          });
          setUpdateMessage('Proposal updated successfully.');
        } catch (error) {
          setUpdateMessage('Failed to update proposal.');
        }
        // Refresh proposals
        const updatedProposals = await getProposals();
        setProposals(updatedProposals);
      }
    }
  };

  const handleSchedule = async () => {
    if (selectedProposalId !== null && openVoteDate && closeVoteDate && selectedStatusId !== null) {
      const proposal = proposals.find(p => p.id === selectedProposalId);
      if (proposal) {
        try {
          await updateProposal(selectedProposalId, {
            ...proposal,
            status: selectedStatusId,
            openvote: openVoteDate.toISOString(),
            closevote: closeVoteDate.toISOString()
          });
          setUpdateMessage('Schedule updated successfully.');
        } catch (error) {
          setUpdateMessage('Failed to update schedule.');
        }
        // Refresh proposals
        const updatedProposals = await getProposals();
        setProposals(updatedProposals);
      }
    }
  };

  const renderActionContent = () => {
    switch (activeAction) {
      case 'approve':
      case 'reject':
        return (
          <div className="flex flex-wrap gap-4 items-center">
            <select
              className="select-field mr-2"
              onChange={(e) => setSelectedProposalId(Number(e.target.value))}
            >
              <option value="">Select Proposal</option>
              {proposals
                .filter(p => p.status === 2 || p.status === 3)
                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
            </select>
            <select
              className="select-field mr-2"
              onChange={(e) => setSelectedStatusId(Number(e.target.value))}
            >
              <option value="">Select Status</option>
              {statuses.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <button
              className={`button-${activeAction === 'approve' ? 'success' : 'danger'}`}
              onClick={() => handleApproveReject(activeAction === 'approve')}
            >
              {activeAction === 'approve' ? 'Approve' : 'Reject'}
            </button>
          </div>
        );
      case 'schedule':
        return (
          <div className="flex flex-wrap gap-4 items-center">
            <select
              className="select-field mr-2"
              onChange={(e) => setSelectedProposalId(Number(e.target.value))}
            >
              <option value="">Select Proposal</option>
              {proposals.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <select
              className="select-field mr-2"
              onChange={(e) => setSelectedStatusId(Number(e.target.value))}
            >
              <option value="">Select Status</option>
              {statuses.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <DatePicker
              selected={openVoteDate}
              onChange={(date: Date | null) => setOpenVoteDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
            <DatePicker
              selected={closeVoteDate}
              onChange={(date: Date | null) => setCloseVoteDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
            <button
              className="button-primary"
              onClick={handleSchedule}
            >
              Schedule
            </button>
          </div>
        );
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        {isAuthenticated ? (
          <div className="animate-fadeIn">
            {/* Tabs Navigation */}
            <div className="flex space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 text-lg font-medium capitalize transition-all duration-200
                    ${activeTab === tab 
                      ? 'border-b-2 border-primary text-primary translate-y-[2px]' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Proposals Tab */}
            {activeTab === 'proposals' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {['approve', 'reject', 'schedule', 'burn', 'dropGas'].map((action) => (
                    <button
                      key={action}
                      onClick={() => setActiveAction(action)}
                      className={`button-primary capitalize ${
                        activeAction === action ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900' : ''
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
                
                {/* Action Content */}
                <div className="card p-6">
                  {renderActionContent()}
                </div>

                {/* Update Message */}
                {updateMessage && (
                  <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                    {updateMessage}
                  </div>
                )}

                {/* Table */}
                <div className="card p-6">
                  <TabbedTable proposals={proposals} statuses={statuses} />
                </div>
              </div>
            )}

            {/* Elections Tab */}
            {activeTab === 'elections' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {['new', 'review', 'schedule', 'burn', 'dropGas'].map((action) => (
                    <button key={action} className="button-primary capitalize">
                      {action}
                    </button>
                  ))}
                </div>
                <div className="card p-6">
                  <ElectionCard />
                </div>
              </div>
            )}

            {/* Treasury Tab */}
            {activeTab === 'treasury' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    'manage wallets',
                    'add comment',
                    'edit comment',
                    'update transactions',
                    'balance check'
                  ].map((action) => (
                    <button key={action} className="button-primary capitalize">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card p-8 text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please sign in to access management features.
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter password"
              className="input-field mb-4"
            />
            <button 
              onClick={handleLogin} 
              className="button-primary w-full"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
