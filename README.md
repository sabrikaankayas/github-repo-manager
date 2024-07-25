# GitHub Repository Manager

This project is a GitHub Repository Manager that allows users to:

- Search and list public repositories according to a user query
- Star/Unstar public repositories
- Watch/Unwatch public repositories
- Toggle the private/public setting of your own repositories

## Technologies Used

- Next.js
- React
- Tailwind CSS
- GitHub API

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- Node.js (version 14 or above)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-repository-manager.git
   cd github-repository-manager
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev
4. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Authentication

1. Navigate to the login page and enter your GitHub Personal Access Token.
2. If the token is valid, you will be redirected to the dashboard.

### Searching for Repositories

1. Use the search bar on the dashboard to find public repositories.
2. Click the settings icon next to a repository to open the repository settings modal.

### Starring/Unstarring Repositories

1. In the repository settings modal, click the star icon to star or unstar the repository.

### Watching/Unwatching Repositories

1. In the repository settings modal, click the bell icon to watch or unwatch the repository.

### Toggling Repository Visibility

1. If you have the appropriate permissions, you can toggle the visibility of your own repositories between public and private in the repository settings modal.

## License

This project is licensed under the MIT License.
