import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TabbedTable from '../components/TabbedTable';
import { getProposals } from '../services/apiService';
import { Proposal } from '../types'; // Import the Proposal type

const Proposals: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const data = await getProposals();
      setProposals(data);
    };

    fetchProposals();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold">Proposals</h2>
        <TabbedTable proposals={proposals} />
      </div>
    </div>
  );
};

export default Proposals;
