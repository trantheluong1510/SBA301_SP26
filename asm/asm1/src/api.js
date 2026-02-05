export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function http(method, path, body, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  let token = '';
  try { token = JSON.parse(localStorage.getItem('auth_token') || '""'); } catch {}
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('auth_user');
    } catch {}
    const from = encodeURIComponent(window.location.pathname + window.location.search);
    const message = encodeURIComponent('Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
    window.location.assign(`/login?message=${message}&from=${from}`);
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

// Authddd
export async function login({ email, password }) {
  const params = new URLSearchParams({ email, password });
  const res = await fetch(`${API_BASE_URL}/api/auth/login?${params.toString()}`, { method: 'POST' });
  if (!res.ok) {
    let msg = '';
    try {
      const data = await res.json();
      msg = data?.message || data?.error || '';
    } catch (_) {
      // Fallback to raw text
      msg = await res.text().catch(() => '');
    }
    const err = new Error(msg || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  const { token, user } = data || {};
  try {
    // Cleanup legacy key if existed
    localStorage.removeItem('authToken');
    if (token) localStorage.setItem('auth_token', JSON.stringify(token));
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
  } catch {}
  return user || data;
}

export async function logout() {
  // Try notify server (stateless). Ignore result errors.
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' });
  } catch {}
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('auth_user');
  } catch {}
}

// Accounts
export const accountsApi = {
  list: () => http('GET', '/api/accounts'),
  create: (data) => http('POST', '/api/accounts', data),
  update: (id, data) => http('PUT', `/api/accounts/${id}`, data),
  setEnabled: (id, value) => http('PATCH', `/api/accounts/${id}/enabled?value=${value}`),
};

// Categories
export const categoriesApi = {
  list: () => http('GET', '/api/categories'),
  create: (data) => http('POST', '/api/categories', data),
  update: (id, data) => http('PUT', `/api/categories/${id}`, data),
  remove: (id) => http('DELETE', `/api/categories/${id}`),
};

// News
export const newsApi = {
  list: () => http('GET', '/api/news'),
  listActive: () => http('GET', '/api/news/active'),
  create: (data) => http('POST', '/api/news', data),
  update: (id, data) => http('PUT', `/api/news/${id}`, data),
  remove: (id) => http('DELETE', `/api/news/${id}`),
};
