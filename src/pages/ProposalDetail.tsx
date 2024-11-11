import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getProposalById } from '../services/apiService';
import { Proposal } from '../types';
import ReactMarkdown from 'react-markdown';
import { useDarkMode } from '../context/DarkModeContext';

const ProposalDetail: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    const fetchProposalDetail = async () => {
      if (id) {
        try {
          const proposalData = await getProposalById(Number(id));
          setProposal(proposalData);
        } catch (error) {
          console.error('Error fetching proposal:', error);
        }
      }
    };

    fetchProposalDetail();
  }, [id]);

  if (!proposal) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
          <h2 className="text-3xl font-bold mb-2">{proposal.title}</h2>
          <h3 className="text-xl mb-4">{proposal.subtitle}</h3>
          <div className="mb-6">
            <ReactMarkdown>{proposal.body}</ReactMarkdown>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
              <h4 className="font-bold">Status: {proposal.status}</h4>
              <p>Discussion Schedule: TBD</p>
              <p>Voting Schedule: TBD</p>
              <p>Snapshot Timestamp: TBD</p>
            </div>
            <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
              <h4 className="font-bold">Voting Progress</h4>
              <div className="w-full bg-gray-600 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: '50%' }}
                ></div>
              </div>
              <p>50% of votes cast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;
