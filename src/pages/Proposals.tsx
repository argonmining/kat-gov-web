import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TabbedTable from '../components/TabbedTable';
import { getProposals, getStatuses } from '../services/apiService';
import { Proposal, Status } from '../types'; // Import the Proposal type

const Proposals: React.FC = () => {
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
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold">Proposals</h2>
        <TabbedTable proposals={proposals} statuses={statuses} />
      </div>
    </div>
  );
};

export default Proposals;
