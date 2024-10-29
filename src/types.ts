// Define types for the API data structures
export interface Proposal {
  id?: number;
  title: string;
  subtitle?: string;
  body?: string;
  type?: number;
  approved?: boolean;
  reviewed?: boolean;
  status?: number; // Change this to a number
  submitdate?: string;
  openvote?: string;
  snapshot?: string;
  closevote?: string;
  amount?: string;
  percentage?: string;
  details?: string;
}

export interface Election {
  id?: number;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface Status {
  id?: number;
  name: string;
  active?: boolean;
}

