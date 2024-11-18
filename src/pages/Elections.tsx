import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ElectionTable from '../components/ElectionTable';
import { getElections } from '../services/apiService';
import { Election } from '../types';

const Elections: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const electionsData = await getElections();
        setElections(electionsData);
      } catch (error) {
        console.error('Error fetching elections:', error);
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
          <h2 className="section-title">Elections</h2>
        </div>

        {isLoading ? (
          <div className="card p-4 text-center">
            <p className="text-gray-600 dark:text-gray-300">Loading elections...</p>
          </div>
        ) : elections.length === 0 ? (
          <div className="card p-4 text-center">
            <h3 className="text-xl font-bold mb-2">No Elections Yet</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No elections have been conducted yet.
            </p>
          </div>
        ) : (
          <div className="card">
            <ElectionTable elections={elections} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Elections;