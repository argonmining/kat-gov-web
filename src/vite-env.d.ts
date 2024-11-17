/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MANAGEMENT_PASSWORD_HASH: string
  readonly GOV_TOKEN_TICKER: string
  readonly GOV_PROJECT_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 