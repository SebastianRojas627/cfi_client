import React, { createContext, useEffect, useState } from "react";
import { UserSession } from "./auth-types";
import { clearSession, getSession, saveSession } from "../utils/session";

interface AuthContextType {
  user: UserSession | null;
  setUserSession: (session: UserSession) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
  }, []);

  const setUserSession = (session: UserSession) => {
    saveSession(session);
    setUser(session);
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUserSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
