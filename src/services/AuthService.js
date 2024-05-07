const API_URL = import.meta.env.VITE_API_URL;

export async function login(payload) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();

  if (result.error) {
    throw new Error(result.message);
  }

  return result;
}

export async function register(payload) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: payload,
  });

  return await response.json();
}

export function getToken() {
  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);
  return user.token;
}
