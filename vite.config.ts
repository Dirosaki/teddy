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
			exposes: {
				'./Login': './src/pages/Login/index.tsx',
				'./Store': './src/store/index.ts',
			},
			remotes: {
				components: process.env.VITE_COMPONENTS_APP_URL || 'http://localhost:5001/assets/remoteEntry.js',
			},
			shared: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
		}),
	],
	build: {
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
	server: {
		cors: {
			origin: '*',
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
			allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'],
		},
		port: 5002,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
