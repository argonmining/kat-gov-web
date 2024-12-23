import { ofetch } from 'ofetch';
import { Proposal, ProposalUpdate, Election, Status, ProposalType } from '../types';

// Add this interface for proposal query parameters
interface ProposalQueryParams {
  sort?: string;
  status?: string;
  title?: string;
  limit?: number;
  offset?: number;
  [key: string]: any; // Allow for additional query parameters
}

const api = ofetch.create({
  baseURL: 'https://govapi.kaspadao.org/api',
});

// Proposals
export const getProposals = async (params: ProposalQueryParams = {}): Promise<Proposal[]> => {
  const limit = 100;
  let offset = 0;
  let allProposals: Proposal[] = [];
  let hasMore = true;

  while (hasMore) {
    const proposals = await api('/proposals', {
      method: 'GET',
      params: { 
        ...params, 
        limit, 
        offset,
        sort: params.sort,
        status: params.status,
        title: params.title
      },
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

// Statuses - Updated endpoints
export const getStatuses = async (): Promise<Status[]> => {
  return await api('/proposals/statuses', {
    method: 'GET',
  });
};

export const createStatus = async (status: Status): Promise<Status> => {
  return await api('/proposals/statuses', {
    method: 'POST',
    body: status,
  });
};

export const updateStatus = async (statusId: number, status: Status): Promise<Status> => {
  return await api(`/proposals/statuses/${statusId}`, {
    method: 'PUT',
    body: status,
  });
};

export const deleteStatus = async (statusId: number): Promise<void> => {
  await api(`/proposals/statuses/${statusId}`, {
    method: 'DELETE',
  });
};

// Draft proposal
export const createDraftProposal = async (): Promise<{ id: number; proposal_wallets_proposals_walletToproposal_wallets: { address: string } }> => {
  const response = await api('/proposals', {
    method: 'POST',
    body: {
      title: "A draft proposal, please replace with the title of your proposal.",
      description: "Please replace this text with a short description of your proposal.",
      wallet: null
    },
  });
  return response;
};

export const getProposalById = async (proposalId: number): Promise<Proposal> => {
  return await api(`/proposals/${proposalId}`, {
    method: 'GET',
  });
};

export const updateProposalById = async (id: number, data: ProposalUpdate) => {
  const validUpdateFields = {
    title: data.title,
    description: data.description,
    reviewed: data.reviewed,
    approved: data.approved,
    passed: data.passed,
    votesActive: data.votesActive,
    status: data.status
  };

  return await api(`/proposals/${id}`, {
    method: 'PUT',
    body: validUpdateFields,
  });
};

export const getProposalSubmitFee = async (proposalId: number): Promise<{ fee: number; wallet: string }> => {
  return await api(`/qualifyProposal/${proposalId}`, {
    method: 'POST',
  });
};

export const getProposalNominationFee = async (): Promise<{ fee: number; currency: string }> => {
  return await api('/nominationFee', {
    method: 'GET',
  });
};

export const getProposalTypes = async (): Promise<ProposalType[]> => {
  return await api('/proposals/types', {
    method: 'GET',
  });
};
