"use client";

import React, { useState } from "react";
import { useGitHubSearch } from "@/context/GithubSearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";

const SearchRepositories: React.FC = () => {
  const { query, setQuery, repositories, loading, error, searchRepositories } =
    useGitHubSearch();
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [starred, setStarred] = useState<boolean>(false);
  const [watched, setWatched] = useState<boolean>(false);
  const [canChangeVisibility, setCanChangeVisibility] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchRepositories();
  };

  const openModal = (repoFullName: string) => {
    setSelectedRepo(repoFullName);
  };

  const closeModal = () => {
    setSelectedRepo(null);
    setStarred(false);
    setWatched(false);
    setCanChangeVisibility(false);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full text-black"
          placeholder="Search repositories..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded mt-2"
        >
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id} className="mb-2 p-2 border rounded">
            <div className="">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {repo.full_name}
              </a>
              <FontAwesomeIcon
                icon={faCog}
                className="text-gray-500 ml-2 cursor-pointer"
                onClick={() => openModal(repo.full_name)}
              />
            </div>
            <p className="truncate">{repo.description}</p>
          </li>
        ))}
      </ul>
      <Modal
        show={!!selectedRepo}
        onClose={closeModal}
        fullName={selectedRepo || ""}
        starred={starred}
        setStarred={setStarred}
        watched={watched}
        setWatched={setWatched}
        canChangeVisibility={canChangeVisibility}
        setCanChangeVisibility={setCanChangeVisibility}
      >
        <h2 className="text-2xl mb-4">Repository Settings</h2>
        <p className="text-sm">{selectedRepo}</p>
      </Modal>
    </div>
  );
};

export default SearchRepositories;
