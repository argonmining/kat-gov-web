"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ProposalCard from '../../components/ProposalCard';
import Tabs from '../../components/Tabs';
import FilterSort from '../../components/FilterSort';
import { fetchProposals } from '../../utils/api';
import { formatDate } from '../../utils/formatters';
import { Proposal } from '../../types';

const Proposals: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('date');
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const loadProposals = async () => {
      try {
        const data: Proposal[] = await fetchProposals({ status: selectedTab, sort });
        setProposals(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadProposals();
  }, [selectedTab, sort]);

  const filteredProposals = proposals
    .filter(proposal => (filter ? proposal.status === parseInt(filter) : true))
    .sort((a, b) => (sort === 'date' ? new Date(a.closevote).getTime() - new Date(b.closevote).getTime() : a.title.localeCompare(b.title)));

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Proposals</h1>
        <Tabs tabs={['Pending', 'Approved', 'Rejected']} onSelect={setSelectedTab} />
        <FilterSort onFilterChange={setFilter} onSortChange={setSort} />
        <div className="mt-4 grid grid-cols-1 gap-4">
          {filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              id={proposal.id}
              title={proposal.title}
              description={proposal.subtitle} // Assuming subtitle is used as description
              endDate={formatDate(proposal.closevote)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Proposals;
