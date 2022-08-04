/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FUNCTION_APP_URL: string
  readonly VITE_BLOB_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
