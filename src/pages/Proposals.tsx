import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TabbedTable from '../components/TabbedTable';
import { getProposals, getStatuses } from '../services/apiService';
import { Proposal, Status } from '../types';
import { useDarkMode } from '../context/DarkModeContext';

const Proposals: React.FC = () => {
  const { isDarkMode } = useDarkMode();
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

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-3xl font-bold mb-4">Proposals</h2>
        <TabbedTable proposals={proposals} statuses={statuses} />
      </div>
    </div>
  );
};

export default Proposals;
