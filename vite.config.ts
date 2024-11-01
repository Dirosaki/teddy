import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'auth',
			filename: 'remoteEntry.js',
			remotes: {
				components: process.env.VITE_COMPONENTS_APP_URL || 'http://localhost:5001/assets/remoteEntry.js',
				auth: process.env.VITE_AUTH_APP_URL || 'http://localhost:5002/assets/remoteEntry.js',
				partners: process.env.VITE_PARTNERS_APP_URL || 'http://localhost:5003/assets/remoteEntry.js',
			},
			shared: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
		}),
	],
	build: {
		target: 'esnext',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
