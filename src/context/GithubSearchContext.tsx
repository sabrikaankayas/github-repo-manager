// /context/GitHubSearchContext.tsx
"use client";

import { Repository } from "@/interfaces/githubSearch";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GitHubSearchContextType {
  query: string;
  setQuery: (query: string) => void;
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  searchRepositories: () => Promise<void>;
}

const GitHubSearchContext = createContext<GitHubSearchContextType | undefined>(
  undefined
);

export const GitHubSearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRepositories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      if (!response.ok) {
        throw new Error("Error fetching repositories");
      }
      const data = await response.json();
      setRepositories(data.items);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GitHubSearchContext.Provider
      value={{
        query,
        setQuery,
        repositories,
        loading,
        error,
        searchRepositories,
      }}
    >
      {children}
    </GitHubSearchContext.Provider>
  );
};

export const useGitHubSearch = () => {
  const context = useContext(GitHubSearchContext);
  if (context === undefined) {
    throw new Error(
      "useGitHubSearch must be used within a GitHubSearchProvider"
    );
  }
  return context;
};
