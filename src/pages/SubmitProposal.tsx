import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { createDraftProposal, getProposalById, updateProposalById } from '../services/apiService';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import QRCode from 'react-qr-code';

const SubmitProposal: React.FC = () => {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [proposalId, setProposalId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGenerateProposal = async () => {
    try {
      const { proposalId, walletAddress } = await createDraftProposal();
      setProposalId(proposalId);
      setWalletAddress(walletAddress);

      const proposal = await getProposalById(proposalId);
      setTitle(proposal.title || '');
      setSubtitle(proposal.subtitle || '');
      setBody(proposal.body || '');
      setType('DRAFT');
      setIsGenerated(true);
    } catch (error) {
      console.error('Error generating proposal:', error);
      alert('Failed to generate proposal.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || !body || type === 'DRAFT') {
      alert('All fields are required and type cannot be "DRAFT".');
      return;
    }

    const proposalData = {
      title,
      subtitle,
      body,
      type: type === 'Funding' ? 1 : type === 'Development' ? 2 : 3,
      approved: false,
      reviewed: false,
      status: 2,
    };

    try {
      setIsSubmitting(true);
      if (proposalId !== null) {
        await updateProposalById(proposalId, proposalData);
        setShowSuccess(true);
        setIsGenerated(false);
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Failed to submit proposal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      alert('Wallet address copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy wallet address:', err);
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        {showSuccess ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Proposal Submitted Successfully!</h2>
            <p className="mb-4">Your proposal is not submitted until you send 100 KDAO to the wallet address below:</p>
            <div className="flex justify-center mb-4">
              <QRCode value={walletAddress} size={128} />
            </div>
            <p className="font-bold mb-4">{walletAddress}</p>
            <button onClick={handleCopyToClipboard} className="bg-primary text-white px-4 py-2 rounded">
              Copy Wallet Address
            </button>
          </div>
        ) : (
          <div>
            {!isGenerated ? (
              <button onClick={handleGenerateProposal} className="bg-primary text-white px-4 py-2 rounded">
                Generate Proposal
              </button>
            ) : (
              <div>
                <h2 className="text-2xl font-bold">Submit Proposal</h2>
                <p>Proposal Wallet Address: {walletAddress}</p>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded" required>
                      <option value="DRAFT">DRAFT</option>
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitProposal;
