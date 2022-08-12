/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FUNCTION_APP_URL: string
  readonly VITE_BLOB_URL: string
  readonly VITE_BLOB_SAS_URL: string
  readonly VITE_BLOB_CONTAINER_NAME: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
