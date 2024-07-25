"use client";

import { GitHubUser } from "@/interfaces/user";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  user: GitHubUser;
  loading: boolean;
  error: string | null;
  validateToken: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateToken = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      if (token.length !== 40) {
        setError("Invalid GitHub Personal Access Token");
        throw new Error("Invalid GitHub Personal Access Token");
      }
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Invalid token");
      }
      const data = await response.json();
      setToken(token);
      setUser(data);
      localStorage.setItem("githubToken", token);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("githubToken");
    if (storedToken) {
      validateToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    setLoading(false);
    setError(null);
    localStorage.removeItem("githubToken");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loading, error, validateToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
