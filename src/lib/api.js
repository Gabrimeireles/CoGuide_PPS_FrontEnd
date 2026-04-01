const DEFAULT_API_BASE_URL = 'https://api-coguide.grmeireles.dev';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson && (payload?.message || payload?.error)) ||
      (typeof payload === 'string' && payload) ||
      `HTTP ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export async function apiRequest(path, { method = 'GET', token, body } = {}) {
  const headers = {
    Accept: 'application/json',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  return parseResponse(response);
}

export function getApiBaseUrl() {
  return apiBaseUrl;
}

export function authSignup(payload) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: payload,
  });
}

export function authLogin(payload) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: payload,
  });
}

export function authRefresh(payload) {
  return apiRequest('/auth/refresh', {
    method: 'POST',
    body: payload,
  });
}

export function authMe(token) {
  return apiRequest('/auth/user', { token });
}

export function authLogout(token) {
  return apiRequest('/auth/logout', {
    method: 'POST',
    token,
  });
}

export function getUserChats(token) {
  return apiRequest('/chat/user/me', { token });
}

export function sendChatPrompt(token, prompt, chatId) {
  const chatPath = chatId ? `/chat/send/${chatId}` : '/chat/send';

  return apiRequest(chatPath, {
    method: 'POST',
    token,
    body: { prompt },
  });
}

export function deleteChat(token, chatId) {
  return apiRequest(`/chat/${chatId}`, {
    method: 'DELETE',
    token,
  });
}
