import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

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
				components: 'http://localhost:5001/assets/remoteEntry.js',
			},
			shared: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
		}),
	],
	build: {
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
