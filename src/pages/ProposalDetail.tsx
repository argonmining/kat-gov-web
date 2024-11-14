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
  const [showVoteYesPopup, setShowVoteYesPopup] = useState(false);
  const [showVoteNoPopup, setShowVoteNoPopup] = useState(false);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow-lg`}>
            <h4 className="font-bold">Status: {proposal.status}</h4>
            <p>Discussion Schedule: TBD</p>
            <p>Voting Schedule: TBD</p>
            <p>Snapshot Timestamp: TBD</p>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow-lg`}>
            <h4 className="font-bold">Voting Progress</h4>
            <div className="w-full bg-gray-600 rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full"
                style={{ width: '0%' }}
              ></div>
            </div>
            <p>0% of votes cast</p>
          </div>
        </div>
        <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg mb-8`}>
          <h2 className="text-3xl font-bold mb-2">{proposal.title}</h2>
          <h3 className="text-xl mb-4">{proposal.subtitle}</h3>
          <div className="mb-6">
            <ReactMarkdown className="proposal-markdown">{proposal.body}</ReactMarkdown>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow-lg`}>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowVoteNoPopup(true)}
            >
              Vote No
            </button>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow-lg`}>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setShowVoteYesPopup(true)}
            >
              Vote Yes
            </button>
          </div>
        </div>
        {showVoteNoPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">How to Vote No</h3>
              <p>Instructions on how to vote no...</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowVoteNoPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showVoteYesPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">How to Vote Yes</h3>
              <p>Instructions on how to vote yes...</p>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setShowVoteYesPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalDetail;
