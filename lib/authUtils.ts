export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('authToken', JSON.stringify(token));
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        return JSON.parse(token);
      } catch {
        return token;
      }
    }
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('krushibot_user_token'); // Cleanup old localStorage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('krushibot_user'); // also cleanup old
  }
};
