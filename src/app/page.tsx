// /app/login/page.tsx
"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const { loading, error, validateToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await validateToken(token);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black pt-20">
      <div className="flex flex-col items-center justify-center w-full mt-20">
        <h1 className="mb-8 text-2xl font-bold text-white">
          Sign in to GitHub Manager
        </h1>
        <form
          onSubmit={handleSubmit}
          className="relative p-6 bg-gray-800 border border-gray-700 rounded shadow-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="token"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              GitHub Personal Access Token
            </label>
            <div className="relative">
              <input
                type={showToken ? "text" : "password"}
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-64 p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10"
                maxLength={40}
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute inset-y-0 right-0 flex items-center px-3 py-1 text-gray-500"
              >
                <FontAwesomeIcon icon={showToken ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm" style={{ maxWidth: "15rem" }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-[#1c8139] rounded hover:bg-[#176d2f]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
