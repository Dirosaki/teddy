import { useRef } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthStore } from 'auth/Store'

export const AuthGuard = ({ isPrivate = false }: { isPrivate?: boolean }) => {
	const from = useRef('/')
	const { pathname } = useLocation()

	const loggedIn = useAuthStore((state) => state.loggedIn)
	const logout = useAuthStore((state) => state.logout)

	if (loggedIn && !isPrivate) {
		return <Navigate to={from.current} replace />
	}

	if (!loggedIn && isPrivate) {
		from.current = pathname
		logout()

		return <Navigate to='/login' replace />
	}

	return <Outlet />
}
