import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { createDraftProposal, getProposalById, updateProposalById, getProposalSubmitFee } from '../services/apiService';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import QRCode from 'react-qr-code';
import axios from 'axios';

interface ProposalType {
  id: number;
  name: string;
  simple: boolean;
}

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
  const [proposalTypes, setProposalTypes] = useState<ProposalType[]>([]);
  const [fee, setFee] = useState<number | null>(null);

  useEffect(() => {
    const fetchProposalTypes = async () => {
      try {
        const response = await axios.get('https://govapi.kaspadao.org/api/proposal-types');
        setProposalTypes(response.data);
      } catch (error) {
        console.error('Error fetching proposal types:', error);
      }
    };

    fetchProposalTypes();
  }, []);

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

      const { fee } = await getProposalSubmitFee(proposalId);
      setFee(fee);

      await updateProposalById(proposalId, { status: 1 });
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
      type: proposalTypes.find(pt => pt.name === type)?.id || 0,
      approved: false,
      reviewed: false,
      status: 2,
      submitted: new Date().toISOString(),
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
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        {showSuccess ? (
          <div className="card p-4 text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Proposal Submitted Successfully!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your proposal submission will not be reviewed until you send {fee} ${process.env.REACT_APP_GOV_TOKEN_TICKER} to the wallet address below:
            </p>
            <div className="flex justify-center mb-6">
              <QRCode value={walletAddress} size={128} />
            </div>
            <p className="font-medium mb-6">{walletAddress}</p>
            <button onClick={handleCopyToClipboard} className="button-primary">
              Copy Wallet Address
            </button>
          </div>
        ) : (
          <div>
            {!isGenerated ? (
              <div className="card p-4 text-center max-w-2xl mx-auto">
                <h2 className="section-title mb-4">Create New Proposal</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Click the button below to generate a new proposal. This will create a draft that you can edit.
                </p>
                <button onClick={handleGenerateProposal} className="button-primary">
                  Generate Proposal
                </button>
              </div>
            ) : (
              <div className="card p-4 max-w-4xl mx-auto">
                <h2 className="section-title mb-6">Submit Proposal</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Proposal Wallet Address: {walletAddress}</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="form-label">Type</label>
                    <select 
                      value={type} 
                      onChange={(e) => setType(e.target.value)} 
                      className="select-field" 
                      required
                    >
                      {proposalTypes.map((proposalType) => (
                        <option key={proposalType.id} value={proposalType.name}>
                          {proposalType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Title</label>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      className="input-field" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Subtitle</label>
                    <input 
                      type="text" 
                      value={subtitle} 
                      onChange={(e) => setSubtitle(e.target.value)} 
                      className="input-field" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Proposal Body</label>
                    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      <MarkdownEditor
                        value={body}
                        style={{ height: '400px' }}
                        renderHTML={(text) => text}
                        onChange={({ text }) => setBody(text)}
                        view={{ menu: true, md: true, html: false }}
                        config={{
                          view: {
                            menu: true,
                            md: true,
                            html: false,
                          },
                          canView: {
                            menu: true,
                            md: true,
                            html: false,
                            fullScreen: false,
                            hideMenu: false,
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="button-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                    </button>
                  </div>
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