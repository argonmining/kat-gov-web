import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getProposals, getElections } from '../services/apiService';

const Home: React.FC = () => {
  const [activeProposals, setActiveProposals] = useState(0);
  const [activeElections, setActiveElections] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const proposals = await getProposals({ status: 'active' });
        const elections = await getElections();
        setActiveProposals(proposals.length);
        setActiveElections(elections.length);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <h1 className="section-title text-center mb-12">Welcome to Kaspa DAO Governance</h1>

        <div className="space-y-12">
          <section>
            <h2 className="section-title">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="/proposals"
                className="card hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">View Proposals</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Browse and vote on active governance proposals
                  </p>
                </div>
              </a>
              <a
                href="/submit-proposal"
                className="card hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">Submit Proposal</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Create and submit new governance proposals
                  </p>
                </div>
              </a>
              <a
                href="/elections"
                className="card hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">View Elections</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Participate in ongoing elections
                  </p>
                </div>
              </a>
            </div>
          </section>

          <section>
            <h2 className="section-title">Governance Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    Active Proposals
                  </h3>
                  <p className="text-3xl font-bold text-primary">{activeProposals}</p>
                </div>
              </div>
              <div className="card">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    Active Elections
                  </h3>
                  <p className="text-3xl font-bold text-primary">{activeElections}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
