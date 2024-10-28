import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { createProposal } from '../services/apiService';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const SubmitProposal: React.FC = () => {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !title || !subtitle || !body) {
      alert('All fields are required.');
      return;
    }

    const proposalData = {
      title,
      subtitle,
      body,
      type: type === 'Funding' ? 1 : type === 'Development' ? 2 : 3,
      approved: false,
      reviewed: false,
      status: '1',
    };

    try {
      setIsSubmitting(true);
      await createProposal(proposalData);
      alert('Proposal submitted successfully!');
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Failed to submit proposal.');
    } finally {
      setIsSubmitting(false);
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
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded" required>
              <option value="">Select Type</option>
              <option value="Funding">Funding</option>
              <option value="Development">Development</option>
              <option value="Governance">Governance</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Subtitle</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Proposal Body</label>
            <MarkdownEditor
              value={body}
              style={{ height: '200px' }}
              renderHTML={(text) => text}
              onChange={({ text }) => setBody(text)}
            />
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitProposal;
