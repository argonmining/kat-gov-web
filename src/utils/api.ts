const API_BASE_URL = 'http://localhost:7878/api';

export const fetchProposals = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_BASE_URL}/proposals?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch proposals');
  }
  return response.json();
};

export const fetchElections = async () => {
  const response = await fetch(`${API_BASE_URL}/elections`);
  if (!response.ok) {
    throw new Error('Failed to fetch elections');
  }
  return response.json();
};

