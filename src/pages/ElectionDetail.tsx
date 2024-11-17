import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ElectionCard from '../components/ElectionCard';

const ElectionDetail: React.FC = () => {
  const [showVotePopup, setShowVotePopup] = useState(false);

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Election #1</h2>
          <div className="flex gap-4">
            <button className="button-secondary">Back to Elections</button>
            <button className="button-primary">Vote</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h4 className="text-xl font-bold mb-4">Election Status</h4>
            <div className="space-y-3">
              <p className="flex justify-between">
                <span>Phase:</span>
                <span className="font-medium">Voting</span>
              </p>
              <p className="flex justify-between">
                <span>Start Date:</span>
                <span className="font-medium">March 15, 2024</span>
              </p>
              <p className="flex justify-between">
                <span>End Date:</span>
                <span className="font-medium">March 22, 2024</span>
              </p>
            </div>
          </div>
          <div className="card">
            <h4 className="text-xl font-bold mb-4">Participation</h4>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-4">
              <div
                className="bg-primary h-6 rounded-full transition-all duration-500"
                style={{ width: '45%' }}
              ></div>
            </div>
            <p className="text-center font-medium">45% of eligible voters participated</p>
          </div>
        </div>

        <div className="card mb-8">
          <ElectionCard />
        </div>

        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-6">Candidates</h3>
          <div className="space-y-4">
            {['Candidate 1', 'Candidate 2', 'Candidate 3'].map((candidate) => (
              <div key={candidate} className="card hover:scale-[1.01] transition-transform duration-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{candidate}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      0x1234...5678
                    </p>
                  </div>
                  <button 
                    className="button-primary"
                    onClick={() => setShowVotePopup(true)}
                  >
                    Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showVotePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
            <div className="card max-w-lg w-full mx-4 animate-slideUp">
              <h3 className="text-2xl font-bold mb-4">How to Vote</h3>
              <p className="mb-6">Instructions on how to vote for this candidate...</p>
              <button
                className="button-secondary w-full"
                onClick={() => setShowVotePopup(false)}
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

export default ElectionDetail;