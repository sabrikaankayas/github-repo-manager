const GITHUB_API_URL = "https://api.github.com";

export const checkIfStarred = async (token: string, fullName: string) => {
  const response = await fetch(`${GITHUB_API_URL}/user/starred/${fullName}`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (response.status === 204) {
    return true;
  } else if (response.status === 404) {
    return false;
  } else {
    throw new Error("Error checking starred status");
  }
};

export const starRepository = async (token: string, fullName: string) => {
  const response = await fetch(`${GITHUB_API_URL}/user/starred/${fullName}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Length": "0",
    },
  });

  if (!response.ok) {
    throw new Error("Error starring repository");
  }
};

export const unstarRepository = async (token: string, fullName: string) => {
  const response = await fetch(`${GITHUB_API_URL}/user/starred/${fullName}`, {
    method: "DELETE",
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error unstarring repository");
  }
};

export const checkIfWatched = async (token: string, fullName: string) => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${fullName}/subscription`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
  if (response.status === 200) {
    return true;
  } else if (response.status === 404) {
    return false;
  } else {
    throw new Error("Error checking watched status");
  }
};

export const watchRepository = async (token: string, fullName: string) => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${fullName}/subscription`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({ subscribed: true }),
    }
  );

  if (!response.ok) {
    throw new Error("Error watching repository");
  }
};

export const unwatchRepository = async (token: string, fullName: string) => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${fullName}/subscription`,
    {
      method: "DELETE",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error unwatching repository");
  }
};

export const getRepositoryDetails = async (token: string, fullName: string) => {
  const response = await fetch(`${GITHUB_API_URL}/repos/${fullName}`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching repository details");
  }

  const data = await response.json();
  return data;
};

export const toggleRepoVisibility = async (
  token: string,
  fullName: string,
  makePrivate: boolean
) => {
  const response = await fetch(`${GITHUB_API_URL}/repos/${fullName}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ private: makePrivate }),
  });

  if (!response.ok) {
    throw new Error("Error toggling repository visibility");
  }

  const data = await response.json();
  return data;
};
