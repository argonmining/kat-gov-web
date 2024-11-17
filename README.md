# Governance Platform

A flexible governance platform for managing proposals, elections, and treasury.

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

```

## Development
bash
npm install
npm run dev