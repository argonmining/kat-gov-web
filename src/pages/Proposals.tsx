import React from 'react';
import Navbar from '../components/Navbar';
import TabbedTable from '../components/TabbedTable';

const Proposals: React.FC = () => (
  <div>
    <Navbar />
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold">Proposals</h2>
      <TabbedTable />
    </div>
  </div>
);

export default Proposals;
