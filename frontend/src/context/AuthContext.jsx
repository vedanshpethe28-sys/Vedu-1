import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/auth/profile");
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (payload, endpoint = "/auth/login") => {
    const { data } = await api.post(endpoint, payload);
    localStorage.setItem("token", data.token);
    await fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh: fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
