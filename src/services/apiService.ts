import axios from 'axios';
import { Proposal, Election, Status } from '../types'; // Adjust the import path as needed

const api = axios.create({
  baseURL: 'https://govapi.nachowyborski.xyz/api',
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
