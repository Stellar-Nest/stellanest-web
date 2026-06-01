const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws';

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// --- Indices ---

export const indices = {
  list: () => fetchAPI<any[]>('/api/v1/indices'),

  get: (city: string) => fetchAPI<any>(`/api/v1/indices/${city}`),

  history: (city: string, period = '1y', interval = '1d') =>
    fetchAPI<any[]>(`/api/v1/indices/${city}/history?period=${period}&interval=${interval}`),

  compare: (cities: string, period = '1y') =>
    fetchAPI<any>(`/api/v1/indices/compare?cities=${cities}&period=${period}`),
};

// --- Positions ---

export const positions = {
  open: (token: string, data: { city: string; direction: string; collateral: number; leverage: number }) =>
    fetchAPI<any>('/api/v1/positions/open', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }),

  close: (token: string, id: string) =>
    fetchAPI<any>(`/api/v1/positions/${id}/close`, {
      method: 'POST',
      headers: authHeaders(token),
    }),

  my: (token: string) =>
    fetchAPI<any[]>('/api/v1/positions/my', { headers: authHeaders(token) }),

  get: (token: string, id: string) =>
    fetchAPI<any>(`/api/v1/positions/${id}`, { headers: authHeaders(token) }),
};

// --- Orders ---

export const orders = {
  create: (token: string, data: { city: string; side: string; type: string; price?: number; size: number }) =>
    fetchAPI<any>('/api/v1/orders', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }),

  cancel: (token: string, id: string) =>
    fetchAPI<any>(`/api/v1/orders/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    }),

  my: (token: string) =>
    fetchAPI<any[]>('/api/v1/orders/my', { headers: authHeaders(token) }),

  book: (city: string) => fetchAPI<any>(`/api/v1/orders/book/${city}`),

  recent: (city: string, limit = 50) =>
    fetchAPI<any[]>(`/api/v1/orders/recent/${city}?limit=${limit}`),
};

// --- Auth ---

export const auth = {
  challenge: (account: string) =>
    fetchAPI<any>('/api/v1/auth/challenge', {
      method: 'POST',
      body: JSON.stringify({ account }),
    }),

  token: (transaction: string) =>
    fetchAPI<any>('/api/v1/auth/token', {
      method: 'POST',
      body: JSON.stringify({ transaction }),
    }),

  me: (token: string) =>
    fetchAPI<any>('/api/v1/auth/me', { headers: authHeaders(token) }),
};

// --- WebSocket ---

export function createWebSocket(onMessage: (data: any) => void): WebSocket {
  const ws = new WebSocket(WS_URL);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch {
      // ignore parse errors
    }
  };

  return ws;
}
