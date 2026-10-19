import client from '../api/client';
import { authHeader } from './authHeader';

// Track a visit (public endpoint)
export const trackVisit = async (payload) => {
  return client.post('/analytics/track', payload);
};

// Overview stats (admin)
export const getOverview = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return client.get(`/analytics/overview${query ? `?${query}` : ''}`, {
    headers: authHeader(),
  });
};

export const getTopPages = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return client.get(`/analytics/top-pages${query ? `?${query}` : ''}`, {
    headers: authHeader(),
  });
};

export const getVisitsByDate = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return client.get(`/analytics/visits-by-date${query ? `?${query}` : ''}`, {
    headers: authHeader(),
  });
};

export const getVisitsByHour = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return client.get(`/analytics/visits-by-hour${query ? `?${query}` : ''}`, {
    headers: authHeader(),
  });
};

export const getDeviceStats = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return client.get(`/analytics/devices${query ? `?${query}` : ''}`, {
    headers: authHeader(),
  });
};

export const getBrowserStats = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return client.get(`/analytics/browsers${query ? `?${query}` : ''}`, {
    headers: authHeader(),
  });
};

export const getActiveUsers = async () => {
  return client.get('/analytics/active-users', { headers: authHeader() });
};

export const getMonthlySummary = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return client.get(`/analytics/monthly-summary${query ? `?${query}` : ''}`, {
    headers: authHeader(),
  });
};
