import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from 'partners/queryClient'

import { Router } from './Router'

import '@/styles/global.css'
import { LoaderCircle } from 'lucide-react'
import { Suspense } from 'react'

export default function App() {
	return (
		<Suspense
			fallback={
				<div className='flex m-auto flex-col items-center gap-2'>
					<LoaderCircle className='animate-spin duration-700' size={32} absoluteStrokeWidth />
				</div>
			}
		>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<Router />
				</QueryClientProvider>
			</BrowserRouter>
		</Suspense>
	)
}
