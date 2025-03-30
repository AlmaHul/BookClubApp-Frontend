const TOKEN_KEY = 'token';

// Spara token i localStorage
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Hämta token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Ta bort token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Dekoda token (t.ex. för att hämta användarnamn eller roller)
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (err) {
    console.error("Misslyckades att dekoda token:", err);
    return null;
  }
};

// Headers för skyddade API-anrop
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};