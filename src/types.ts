// Define types for the API data structures
export interface Proposal {
  id?: number;
  title: string;
  description?: string;
  body?: string;
  type?: number;
  approved?: boolean;
  reviewed?: boolean;
  status?: number;
  submitted?: string;
  openvote?: string;
  snapshot?: string;
  closevote?: string;
  amount?: string;
  percentage?: string;
  details?: string;
  votesActive?: boolean;
  passed?: boolean;
  proposal_wallets_proposals_walletToproposal_wallets?: {
    address: string;
  } | null;
  proposal_statuses?: {
    id: number;
    name: string;
    active: boolean;
  };
}

// Define ProposalUpdate as a partial type of Proposal
export type ProposalUpdate = Partial<Proposal>;

export interface Election {
  id?: number;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

export interface Status {
  id?: number;
  name: string;
  active?: boolean;
}

export interface ProposalType {
  id: number;
  name: string;
  simple: boolean;
}

