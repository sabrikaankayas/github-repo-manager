"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faStar as faSolidStar,
  faStar as faEmptyStar,
  faBell,
  faBellSlash,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import {
  checkIfStarred,
  checkIfWatched,
  starRepository,
  unstarRepository,
  watchRepository,
  unwatchRepository,
  getRepositoryDetails,
  toggleRepoVisibility,
} from "@/services/githubApi";
import { useAuth } from "@/context/AuthContext";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  fullName: string;
  children: React.ReactNode;
  starred: boolean;
  setStarred: (starred: boolean) => void;
  watched: boolean;
  setWatched: (watched: boolean) => void;
  canChangeVisibility: boolean;
  setCanChangeVisibility: (watched: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  fullName,
  starred,
  setStarred,
  watched,
  setWatched,
  canChangeVisibility,
  setCanChangeVisibility,
  children,
}) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState<boolean | null>(null);

  useEffect(() => {
    if (show && token) {
      setLoading(true);
      setError(null);

      const fetchData = async () => {
        try {
          const repoDetails = await getRepositoryDetails(token, fullName);
          setIsPrivate(repoDetails.private);
          setCanChangeVisibility(repoDetails.permissions.admin);

          const isStarred = await checkIfStarred(token, fullName);
          const isWatched = await checkIfWatched(token, fullName);
          setStarred(isStarred);
          setWatched(isWatched);
        } catch (err) {
          setError("Error fetching repository data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [show, fullName, token, setStarred, setWatched]);

  const handleStar = async () => {
    setLoading(true);
    setError(null);
    try {
      if (starred) {
        await unstarRepository(token!, fullName);
        setStarred(false);
      } else {
        await starRepository(token!, fullName);
        setStarred(true);
      }
    } catch (err) {
      setError("Error updating star status");
    } finally {
      setLoading(false);
    }
  };

  const handleWatch = async () => {
    setLoading(true);
    setError(null);
    try {
      if (watched) {
        await unwatchRepository(token!, fullName);
        setWatched(false);
      } else {
        await watchRepository(token!, fullName);
        setWatched(true);
      }
    } catch (err) {
      setError("Error updating watch status");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async () => {
    if (isPrivate === null) return;

    setLoading(true);
    setError(null);
    try {
      const updatedRepo = await toggleRepoVisibility(
        token!,
        fullName,
        !isPrivate
      );
      setIsPrivate(updatedRepo.private);
    } catch (err) {
      setError("Error toggling repository visibility");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-black">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            className="cursor-pointer hover:text-gray-700"
          />
        </button>
        <div className="flex flex-col justify-between mb-4">
          {children}
          <div className="flex w-full justify-evenly mt-4">
            <button
              onClick={handleStar}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors w-24 ${
                starred ? "bg-yellow-600" : "bg-gray-300"
              }`}
              disabled={loading}
            >
              <FontAwesomeIcon
                icon={starred ? faSolidStar : faEmptyStar}
                size="2x"
                className={`text-white ${
                  starred ? "text-yellow-500" : "text-gray-400"
                }`}
              />
              <span
                className={`mt-2 text-sm font-semibold ${
                  starred ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                {loading ? "Loading..." : starred ? "Starred" : "Star"}
              </span>
            </button>
            <button
              onClick={handleWatch}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors w-24 ${
                watched ? "bg-blue-600" : "bg-gray-300"
              }`}
              disabled={loading}
            >
              <FontAwesomeIcon
                icon={watched ? faBell : faBellSlash}
                size="2x"
                className={`text-white ${
                  watched ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <span
                className={`mt-2 text-sm font-semibold ${
                  watched ? "text-blue-500" : "text-gray-500"
                }`}
              >
                {loading ? "Loading..." : watched ? "Watching" : "Watch"}
              </span>
            </button>
            {canChangeVisibility && (
              <button
                onClick={handleToggleVisibility}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors w-24 ${
                  isPrivate ? "bg-red-600" : "bg-green-600"
                }`}
                disabled={loading}
              >
                <FontAwesomeIcon
                  icon={isPrivate ? faLock : faLockOpen}
                  size="2x"
                  className="text-white"
                />
                <span className="mt-2 text-sm font-semibold text-white">
                  {loading
                    ? "Loading..."
                    : isPrivate
                    ? "Make Public"
                    : "Make Private"}
                </span>
              </button>
            )}
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
