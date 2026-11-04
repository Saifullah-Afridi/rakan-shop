import { createContext, useContext, useState, type ReactNode } from "react";
import { clearToken } from "../services/apiClient";
import { loginAdmin, type AdminUser } from "../services/authService";

interface AuthValue {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthValue | null>(null);
const KEY = "rakan-admin-session";

export function AuthProvider({ children }: { children: ReactNode }) {
  // The signed-in admin is kept in the browser so a refresh does not sign you out.
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? "null");
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    const admin = await loginAdmin(email, password);
    localStorage.setItem(KEY, JSON.stringify(admin));
    setUser(admin);
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    clearToken();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
