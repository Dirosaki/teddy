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
				'./queryClient': './src/lib/queryClient.ts',
				'./Partners': './src/pages/Partners/index.tsx',
				'./Companies': './src/pages/Companies/index.tsx',
			},
			shared: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
			remotes: {
				components: 'http://localhost:5001/assets/remoteEntry.js',
				auth: 'http://localhost:5002/assets/remoteEntry.js',
			},
		}),
	],
	build: {
		outDir: 'dist',
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
