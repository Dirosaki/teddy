import { useRoutes } from 'react-router-dom'

import Login from 'auth/Login'
import Companies from 'partners/Companies'
import Partners from 'partners/Partners'

import { PrivateLayout } from '@/layouts/PrivateLayout'
import Home from '@/pages/Home'
import { AuthGuard } from './AuthGuard'

export const Router = () =>
	useRoutes([
		{
			element: <AuthGuard />,
			children: [
				{
					path: '/login',
					element: <Login />,
				},
			],
		},
		{
			element: <AuthGuard isPrivate />,
			children: [
				{
					path: '/',
					element: <PrivateLayout />,
					children: [
						{
							path: '/',
							element: <Home />,
						},
						{
							path: '/partners',
							element: <Partners />,
						},
						{
							path: '/companies',
							element: <Companies />,
						},
					],
				},
			],
		},
	])
