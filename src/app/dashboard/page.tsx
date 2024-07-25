"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchRepositories from "@/components/searchRepositories";
import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="container mx-auto pt-20">
        <h1 className="text-3xl font-bold mb-8 ml-4">
          Search for Repositories
        </h1>
        <SearchRepositories />
      </div>
    </div>
  );
};

export default DashboardPage;
