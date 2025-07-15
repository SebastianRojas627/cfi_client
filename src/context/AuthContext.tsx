import React, { createContext, useEffect, useState } from "react";
import { UserSession } from "./auth-types";
import { clearSession, getSession, saveSession } from "../utils/session";

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  setUserSession: (session: UserSession) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
      setLoading(false)
    }
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
    <AuthContext.Provider value={{ user, loading, setUserSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
