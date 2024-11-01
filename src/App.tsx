import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from 'partners/queryClient'

import { Router } from './Router'

import '@/styles/global.css'

export default function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</BrowserRouter>
	)
}
