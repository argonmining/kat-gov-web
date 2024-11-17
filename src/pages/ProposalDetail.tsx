import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getProposalById } from '../services/apiService';
import { Proposal } from '../types';
import ReactMarkdown from 'react-markdown';

const ProposalDetail: React.FC = () => {
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
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h4 className="text-xl font-bold mb-4">Status: {proposal.status}</h4>
            <div className="space-y-3">
              <p className="flex justify-between">
                <span>Discussion Schedule:</span>
                <span className="font-medium">TBD</span>
              </p>
              <p className="flex justify-between">
                <span>Voting Schedule:</span>
                <span className="font-medium">TBD</span>
              </p>
              <p className="flex justify-between">
                <span>Snapshot Timestamp:</span>
                <span className="font-medium">TBD</span>
              </p>
            </div>
          </div>
          <div className="card">
            <h4 className="text-xl font-bold mb-4">Voting Progress</h4>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-4">
              <div
                className="bg-primary h-6 rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              ></div>
            </div>
            <p className="text-center font-medium">0% of votes cast</p>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-3xl font-bold mb-3">{proposal.title}</h2>
          <h3 className="text-xl text-gray-600 dark:text-gray-300 mb-6">{proposal.subtitle}</h3>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown className="proposal-markdown">{proposal.body}</ReactMarkdown>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card flex justify-center items-center">
            <button
              className="button-danger w-4/5"
              onClick={() => setShowVoteNoPopup(true)}
            >
              Vote No
            </button>
          </div>
          <div className="card flex justify-center items-center">
            <button
              className="button-success w-4/5"
              onClick={() => setShowVoteYesPopup(true)}
            >
              Vote Yes
            </button>
          </div>
        </div>

        {/* Vote modals */}
        {showVoteNoPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
            <div className="card max-w-lg w-full mx-4 animate-slideUp">
              <h3 className="text-2xl font-bold mb-4">How to Vote No</h3>
              <p className="mb-6">Instructions on how to vote no...</p>
              <button
                className="button-secondary w-full"
                onClick={() => setShowVoteNoPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showVoteYesPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
            <div className="card max-w-lg w-full mx-4 animate-slideUp">
              <h3 className="text-2xl font-bold mb-4">How to Vote Yes</h3>
              <p className="mb-6">Instructions on how to vote yes...</p>
              <button
                className="button-secondary w-full"
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
