import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "../lib/axios";
import { useHistory } from "react-router-dom";
import { LocalStorageHandler } from "../lib/utils";

interface User {
  name: string;
  email: string;
  phone: string;
  role: "Student" | "Teacher";
  age: number;
  bio?: string;
  maritalStatus?: string;
  experience?: number;
  schoolName?: string;
  subjects?: string[];
  grade?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  register: (userData: User) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(LocalStorageHandler.getToken());

  const register = async (userData: User) => {
    const response = await axiosInstance.post("/auth/register", userData);
    const { user, token } = response.data;
    setUser({ ...user, token });
    localStorage.setItem("token", JSON.stringify({ ...user, token }));
  };

  const login = async (credentials: { email: string; password: string }) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    const { user, token } = response.data;
    setUser({ ...user, token });
    localStorage.setItem("token", JSON.stringify({ ...user, token }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    useHistory().push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
