import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiLogin, apiLogout, apiMe, apiRegister } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = checking, false = signed out

  useEffect(() => {
    apiMe()
      .then(({ data }) => setUser(data))
      .catch(() => setUser(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await apiLogin(email, password);
    setUser(data);
    return data;
  }, []);

  const register = useCallback(async (email, password, name) => {
    const { data } = await apiRegister(email, password, name);
    setUser(data);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setUser(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
