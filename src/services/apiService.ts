import { ofetch } from 'ofetch';
import { Proposal, ProposalUpdate, Election, Status } from '../types';

const api = ofetch.create({
  baseURL: 'https://govapi.kaspadao.org/api',
});

// Proposals
export const getProposals = async (params = {}): Promise<Proposal[]> => {
  const limit = 1000;
  let offset = 0;
  let allProposals: Proposal[] = [];
  let hasMore = true;

  while (hasMore) {
    const proposals = await api('/proposals', {
      method: 'GET',
      params: { ...params, limit, offset },
    });
    allProposals = allProposals.concat(proposals);
    offset += limit;
    hasMore = proposals.length === limit;
  }

  return allProposals;
};

export const createProposal = async (proposal: Proposal): Promise<Proposal> => {
  return await api('/proposals', {
    method: 'POST',
    body: proposal,
  });
};

export const updateProposal = async (proposalId: number, proposal: Proposal): Promise<Proposal> => {
  return await api(`/proposals/${proposalId}`, {
    method: 'PUT',
    body: proposal,
  });
};

export const deleteProposal = async (proposalId: number): Promise<void> => {
  await api(`/proposals/${proposalId}`, {
    method: 'DELETE',
  });
};

// Elections
export const getElections = async (): Promise<Election[]> => {
  return await api('/elections', {
    method: 'GET',
  });
};

export const createElection = async (election: Election): Promise<Election> => {
  return await api('/elections', {
    method: 'POST',
    body: election,
  });
};

// Statuses
export const getStatuses = async (): Promise<Status[]> => {
  return await api('/statuses', {
    method: 'GET',
  });
};

export const createStatus = async (status: Status): Promise<Status> => {
  return await api('/statuses', {
    method: 'POST',
    body: status,
  });
};

export const updateStatus = async (statusId: number, status: Status): Promise<Status> => {
  return await api(`/statuses/${statusId}`, {
    method: 'PUT',
    body: status,
  });
};

export const deleteStatus = async (statusId: number): Promise<void> => {
  await api(`/statuses/${statusId}`, {
    method: 'DELETE',
  });
};

// New function to create a draft proposal
export const createDraftProposal = async (): Promise<{ proposalId: number; walletAddress: string }> => {
  return await api('/proposals', {
    method: 'POST',
    body: {
      title: "A draft proposal, please replace with the title of your proposal.",
      description: "Please replace this text with a short description of your proposal.",
      type: 4,
      approved: false,
      reviewed: false,
      status: 1,
    },
  });
};

// New function to get a proposal by ID
export const getProposalById = async (proposalId: number): Promise<Proposal> => {
  return await api(`/proposals/${proposalId}`, {
    method: 'GET',
  });
};

// New function to update a proposal
export const updateProposalById = async (id: number, data: ProposalUpdate) => {
  return await api(`/proposals/${id}`, {
    method: 'PUT',
    body: data,
  });
};

// New function to get the proposal submission fee
export const getProposalSubmitFee = async (proposalId: number): Promise<{ fee: number; wallet: string }> => {
  return await api(`/qualifyProposal/${proposalId}`, {
    method: 'POST',
  });
};

// New function to get the proposal nomination fee
export const getProposalNominationFee = async (): Promise<{ fee: number }> => {
  return await api('/nominationFee', {
    method: 'GET',
  });
};
