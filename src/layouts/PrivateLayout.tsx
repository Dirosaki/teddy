import { LoaderCircle } from 'lucide-react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Toaster } from 'components/ui/toaster'

import { Header } from '@/components/Header'

export const PrivateLayout = () => {
	return (
		<>
			<Header />
			<main className='flex-1 flex px-4 py-8'>
				<Suspense
					fallback={
						<div className='flex m-auto flex-col items-center gap-2'>
							<LoaderCircle className='animate-spin duration-700' size={32} absoluteStrokeWidth />
						</div>
					}
				>
					<Outlet />
				</Suspense>
			</main>
			<Toaster />
		</>
	)
}
