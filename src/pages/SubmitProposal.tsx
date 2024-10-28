import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { createProposal } from '../services/apiService';

const SubmitProposal: React.FC = () => {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const proposalData = {
      title,
      subtitle,
      body,
      type: type === 'Funding' ? 1 : type === 'Development' ? 2 : 3,
      approved: false,
      reviewed: false,
      status: '1', // Convert status to a string
    };

    try {
      await createProposal(proposalData);
      alert('Proposal submitted successfully!');
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Failed to submit proposal.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold">Submit Proposal</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Type</option>
              <option value="Funding">Funding</option>
              <option value="Development">Development</option>
              <option value="Governance">Governance</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Subtitle</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Proposal Body</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full p-2 border rounded h-32" />
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitProposal;
