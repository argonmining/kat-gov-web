export interface Proposal {
  id: number;
  title: string;
  subtitle: string;
  body: string;
  type: number;
  approved: boolean;
  reviewed: boolean;
  status: number;
  submitdate: string;
  openvote: string;
  snapshot: string;
  closevote: string;
}
