import axios from 'axios';
import { Proposal, ProposalUpdate, Election, Status } from '../types'; // Adjust the import path as needed

const api = axios.create({
  baseURL: 'https://govapi.kaspadao.org/api',
});

// Proposals
export const getProposals = async (params = {}): Promise<Proposal[]> => {
  const response = await api.get('/proposals', { params });
  return response.data;
};

export const createProposal = async (proposal: Proposal): Promise<Proposal> => {
  const response = await api.post('/proposals', proposal);
  return response.data;
};

export const updateProposal = async (proposalId: number, proposal: Proposal): Promise<Proposal> => {
  const response = await api.put(`/proposals/${proposalId}`, proposal);
  return response.data;
};

export const deleteProposal = async (proposalId: number): Promise<void> => {
  await api.delete(`/proposals/${proposalId}`);
};

// Elections
export const getElections = async (): Promise<Election[]> => {
  const response = await api.get('/elections');
  return response.data;
};

export const createElection = async (election: Election): Promise<Election> => {
  const response = await api.post('/elections', election);
  return response.data;
};

// Statuses
export const getStatuses = async (): Promise<Status[]> => {
  const response = await api.get('/statuses');
  return response.data;
};

export const createStatus = async (status: Status): Promise<Status> => {
  const response = await api.post('/statuses', status);
  return response.data;
};

export const updateStatus = async (statusId: number, status: Status): Promise<Status> => {
  const response = await api.put(`/statuses/${statusId}`, status);
  return response.data;
};

export const deleteStatus = async (statusId: number): Promise<void> => {
  await api.delete(`/statuses/${statusId}`);
};

// New function to create a draft proposal
export const createDraftProposal = async (): Promise<{ proposalId: number; walletAddress: string }> => {
  const response = await api.post('/proposals', {
    title: "A draft proposal, please replace with the title of your proposal.",
    description: "Please replace this text with a short description of your proposal.",
    type: 4,
    approved: false,
    reviewed: false,
    status: 1
  });
  return response.data;
};

// New function to get a proposal by ID
export const getProposalById = async (proposalId: number): Promise<Proposal> => {
  const response = await api.get(`/proposals/${proposalId}`);
  return response.data;
};

// New function to update a proposal
export const updateProposalById = async (id: number, data: ProposalUpdate) => {
  const response = await api.put(`/proposals/${id}`, data);
  return response.data;
};

// New function to get the proposal submission fee
export const getProposalSubmitFee = async (proposalId: number): Promise<{ fee: number; wallet: string }> => {
  const response = await api.post(`/qualifyProposal/${proposalId}`);
  return response.data;
};

// New function to get the proposal nomination fee
export const getProposalNominationFee = async (): Promise<{ fee: number }> => {
  const response = await api.get('/nominationFee');
  return response.data;
};
