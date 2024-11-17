/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MANAGEMENT_PASSWORD_HASH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 