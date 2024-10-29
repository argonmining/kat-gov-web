import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getProposalById } from '../services/apiService';
import { Proposal } from '../types';
import ReactMarkdown from 'react-markdown';

const ProposalDetail: React.FC = () => {
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
    return <div>Loading...</div>;
  }

  // Placeholder data
  const placeholderData = {
    discussionSchedule: "TBD",
    votingSchedule: "TBD",
    snapshotTimestamp: "TBD",
    votingProgress: 50, // Example percentage
    tokensBurned: 1000, // Example number
    uniqueVoters: 100, // Example number
    voteOutcome: "Pending" // Example outcome
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold">{proposal.title}</h2>
        <h3 className="text-xl mt-2">{proposal.subtitle}</h3>
        <div className="mt-4">
          <ReactMarkdown>{proposal.body}</ReactMarkdown>
        </div>
        <div className="mt-8">
          <h4 className="font-bold">Status: {proposal.status}</h4>
          <p>Discussion Schedule: {placeholderData.discussionSchedule}</p>
          <p>Voting Schedule: {placeholderData.votingSchedule}</p>
          <p>Snapshot Timestamp: {placeholderData.snapshotTimestamp}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-bold">Voting Progress</h4>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${placeholderData.votingProgress}%` }}
            ></div>
          </div>
          <p>{placeholderData.votingProgress}% of votes cast</p>
        </div>
        <div className="mt-4">
          <h4 className="font-bold">Statistics</h4>
          <p>Total Tokens Burned: {placeholderData.tokensBurned}</p>
          <p>Unique Voters: {placeholderData.uniqueVoters}</p>
          {placeholderData.voteOutcome && <p>Outcome: {placeholderData.voteOutcome}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;
