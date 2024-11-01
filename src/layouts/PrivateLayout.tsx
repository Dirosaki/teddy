import { Outlet } from 'react-router-dom'

import { Toaster } from 'components/ui/toaster'

import { Header } from '@/components/Header'

export const PrivateLayout = () => {
	return (
		<>
			<Header />
			<main className='flex-1 flex px-4 py-8'>
				<Outlet />
			</main>
			<Toaster />
		</>
	)
}
