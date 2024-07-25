"use client";

import React, { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Profile from "@/components/profile";
import { GitHubSearchProvider } from "@/context/GithubSearchContext";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();

  return (
    <GitHubSearchProvider>
      <div>
        <div className="flex justify-center items-center  bg-gradient-to-r from-black via-gray-900 to-black h-20 border-b-2">
          <nav className="flex w-full items-center justify-end p-4 text-white gap-4 mr-2 ">
            <Profile
              avatarUrl={user?.avatar_url}
              name={user?.name}
              bio={user?.login}
              onLogout={logout}
            />
          </nav>
        </div>
        {children}
      </div>
    </GitHubSearchProvider>
  );
};

export default DashboardLayout;
