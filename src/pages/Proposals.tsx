import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TabbedTable from '../components/TabbedTable';
import { getProposals, getStatuses } from '../services/apiService';
import { Proposal, Status } from '../types';

const Proposals: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proposalsData, statusesData] = await Promise.all([
          getProposals(),
          getStatuses()
        ]);
        setProposals(proposalsData);
        setStatuses(statusesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="flex justify-between items-center mb-2">
          <h2 className="section-title">Proposals</h2>
        </div>

        {isLoading ? (
          <div className="card p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">Loading proposals...</p>
          </div>
        ) : proposals.length === 0 ? (
          <div className="card p-8 text-center">
            <h3 className="text-xl font-bold mb-2">No Proposals Yet</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No proposals have been submitted to the community yet.
            </p>
          </div>
        ) : (
          <div className="card">
            <TabbedTable proposals={proposals} statuses={statuses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposals;
