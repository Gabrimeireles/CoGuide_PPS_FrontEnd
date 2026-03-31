/* eslint-disable react/prop-types, react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authLogin, authMe } from '/src/lib/api';

const AuthContext = createContext();

const TOKEN_STORAGE_KEY = 'token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_STORAGE_KEY) || null);
  const [authLoading, setAuthLoading] = useState(Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)));

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setAuthLoading(false);
  }, []);

  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

    setAuthLoading(true);

    try {
      const data = await authMe(token);
      setUser(data);
    } catch (_error) {
      logout();
    } finally {
      setAuthLoading(false);
    }
  }, [logout, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    const data = await authLogin({ email, password });

    if (!data?.token) {
      throw new Error('Falha de autenticação');
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    setToken(data.token);
  };

  return <AuthContext.Provider value={{ user, token, authLoading, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
