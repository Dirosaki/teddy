import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Login = lazy(() => import('auth/Login'))
const Companies = lazy(() => import('partners/Companies'))
const Partners = lazy(() => import('partners/Partners'))

import { PrivateLayout } from '@/layouts/PrivateLayout'
import { AuthGuard } from './AuthGuard'

const Home = lazy(() => import('@/pages/Home'))

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
