/* eslint-disable react/prop-types, react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authLogin, authLogout, authMe, authRefresh } from '/src/lib/api';

const AuthContext = createContext();

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const LEGACY_TOKEN_STORAGE_KEY = 'token';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ||
      localStorage.getItem(LEGACY_TOKEN_STORAGE_KEY) ||
      null,
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) || null,
  );
  const [authLoading, setAuthLoading] = useState(
    Boolean(
      localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ||
        localStorage.getItem(LEGACY_TOKEN_STORAGE_KEY),
    ),
  );

  const clearAuthState = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(LEGACY_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setAuthLoading(false);
  }, []);

  const persistTokens = useCallback((data) => {
    const access = data?.accessToken || data?.token;
    const refresh = data?.refreshToken || null;

    if (!access) {
      throw new Error('Falha de autenticação');
    }

    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access);
    localStorage.removeItem(LEGACY_TOKEN_STORAGE_KEY);
    setToken(access);

    if (refresh) {
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh);
      setRefreshToken(refresh);
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      throw new Error('Sessão expirada');
    }

    const data = await authRefresh({ refreshToken });
    persistTokens(data);
    return data?.accessToken || data?.token;
  }, [persistTokens, refreshToken]);

  const requestWithAuth = useCallback(
    async (requestFn) => {
      if (!token) {
        throw new Error('Usuário não autenticado');
      }

      try {
        return await requestFn(token);
      } catch (error) {
        if (error?.status !== 401 || !refreshToken) {
          throw error;
        }

        try {
          const renewedToken = await refreshAccessToken();
          return await requestFn(renewedToken);
        } catch (refreshError) {
          clearAuthState();
          throw refreshError;
        }
      }
    },
    [clearAuthState, refreshAccessToken, refreshToken, token],
  );

  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

    setAuthLoading(true);

    try {
      const data = await requestWithAuth((accessToken) => authMe(accessToken));
      setUser(data);
    } catch (_error) {
      clearAuthState();
    } finally {
      setAuthLoading(false);
    }
  }, [clearAuthState, requestWithAuth, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    const data = await authLogin({ email, password });
    persistTokens(data);
    const currentUser = await authMe(data?.accessToken || data?.token);
    setUser(currentUser);
  };

  const logout = useCallback(async () => {
    const currentToken = token;

    if (currentToken) {
      try {
        await authLogout(currentToken);
      } catch (_error) {
        // Ignore backend logout failures; local revoke still required.
      }
    }

    clearAuthState();
  }, [clearAuthState, token]);

  return (
    <AuthContext.Provider
      value={{ user, token, authLoading, login, logout, requestWithAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
