# Governance Platform

**Note: This project is under active development, and changes are made frequently. It is currently operating in a closed beta with dedicated customers. This repository contains the frontend for the Kat Gov system. The backend can be found [here](https://github.com/argonmining/kat-gov).**

**Repository Structure:**
- The "Main" branch is under active development.
- Each other branch represents a production environment for a dedicated customer.
- While the project is in Closed Beta, all development is open source and built in public, with immediate public commits.

## Overview

The Governance Platform is a flexible system designed to manage proposals, elections, and treasury operations. It provides a user-friendly interface for interacting with governance processes.

## Environment Variables

The following environment variables need to be configured:

| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_MANAGEMENT_PASSWORD_HASH | SHA-256 hash of the management password | 7b7031bc... |
| REACT_APP_GOV_TOKEN_TICKER | The ticker symbol for your governance token | NACHO |
| REACT_APP_GOV_PROJECT_NAME | The name of your governance project | Kat Gov |

## Setup

1. Copy `.env.example` to `.env`
2. Configure the environment variables
3. Generate a management password hash using the provided script:

## Development

To start development, run the following commands:

```

## Features

- **Proposals Management**: Create, view, and vote on governance proposals.
- **Elections**: Participate in ongoing elections.
- **Treasury Management**: Manage wallets and transactions.

## Code Structure

- **Pages**: Contains the main pages of the application.
  - `Home.tsx`: Displays key features and governance statistics.
  - `ProposalDetail.tsx`: Shows detailed information about a specific proposal.
  - `SubmitProposal.tsx`: Allows users to create and submit new proposals.
  - `Management.tsx`: Provides management functionalities for proposals and elections.
  - `Proposals.tsx`: Lists all proposals with their statuses.

- **Components**: Reusable UI components used across different pages.
- **Services**: Contains API service functions for interacting with the backend.
- **Types**: TypeScript type definitions for the application.

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).
