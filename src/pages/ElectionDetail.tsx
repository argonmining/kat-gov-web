import React from 'react';
import Navbar from '../components/Navbar';

const ElectionDetail: React.FC = () => (
  <div>
    <Navbar />
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold">Election Detail</h2>
      {/* Election details go here */}
    </div>
  </div>
);

export default ElectionDetail;
