import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'components',
			filename: 'remoteEntry.js',
			exposes: {
				'./ui/button': './src/components/ui/button.tsx',
				'./ui/card': './src/components/ui/card.tsx',
				'./ui/checkbox': './src/components/ui/checkbox.tsx',
				'./ui/input': './src/components/ui/input.tsx',
				'./ui/label': './src/components/ui/label.tsx',
				'./ui/toaster': './src/components/ui/sonner.tsx',
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
		port: 5001,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
