/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PARTNERS_URL: string
	readonly VITE_COMPANIES_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
