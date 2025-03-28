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

// Är användaren inloggad?
export const isLoggedIn = () => {
  return !!getToken();
};

// Headers för skyddade API-anrop
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};