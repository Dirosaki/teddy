import { LogOut } from 'lucide-react'

import { useAuthStore } from 'auth/Store'
import { Button } from 'components/ui/button'

import { NavLink } from './NavLink'

export const Header = () => {
	const logout = useAuthStore((state) => state.logout)

	const username = localStorage.getItem('username')

	return (
		<header className='h-16 border-b flex px-4'>
			<div className='flex items-center gap-4 my-auto w-full justify-between min-w-[560px] max-w-screen-xl mx-auto'>
				<nav className='flex gap-5'>
					<NavLink to='/'>Página Inicial</NavLink>
					<NavLink to='/partners'>Parceiros</NavLink>
					<NavLink to='/companies'>Empresas externas</NavLink>
				</nav>

				{username && <b className='ml-auto capitalize font-medium'>{username}</b>}

				<Button type='button' size='icon' variant='outline' onClick={logout}>
					<LogOut />
				</Button>
			</div>
		</header>
	)
}
