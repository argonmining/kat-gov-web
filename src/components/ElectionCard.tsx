import React, { useState } from 'react';

const ElectionCard: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState('nomination');
  const phases = ['nomination', 'voting', 'results'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Phase Navigation */}
      <div className="flex justify-between items-center">
        {phases.map((phase, index) => (
          <div key={phase} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center
              ${currentPhase === phase 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
            >
              {index + 1}
            </div>
            {index < phases.length - 1 && (
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* Phase Content */}
      <div className="card">
        {currentPhase === 'nomination' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Nomination Phase</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Candidate Name</label>
                <input type="text" className="input-field" placeholder="Enter candidate name" />
              </div>
              <div>
                <label className="form-label">Wallet Address</label>
                <input type="text" className="input-field" placeholder="Enter wallet address" />
              </div>
              <div>
                <label className="form-label">Statement</label>
                <textarea 
                  className="input-field min-h-[100px]" 
                  placeholder="Enter candidate statement"
                />
              </div>
              <button className="button-primary w-full">
                Submit Nomination
              </button>
            </div>
          </div>
        )}

        {currentPhase === 'voting' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Voting Phase</h3>
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
                    <button className="button-primary">
                      Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPhase === 'results' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Election Results</h3>
            <div className="space-y-4">
              {['Candidate 1', 'Candidate 2', 'Candidate 3'].map((candidate, index) => (
                <div key={candidate} className="card">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">{candidate}</h4>
                      <span className="text-primary font-medium">
                        {100 - (index * 30)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${100 - (index * 30)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button 
          className="button-secondary"
          onClick={() => {
            const currentIndex = phases.indexOf(currentPhase);
            if (currentIndex > 0) {
              setCurrentPhase(phases[currentIndex - 1]);
            }
          }}
          disabled={currentPhase === phases[0]}
        >
          Previous
        </button>
        <button 
          className="button-primary"
          onClick={() => {
            const currentIndex = phases.indexOf(currentPhase);
            if (currentIndex < phases.length - 1) {
              setCurrentPhase(phases[currentIndex + 1]);
            }
          }}
          disabled={currentPhase === phases[phases.length - 1]}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ElectionCard;