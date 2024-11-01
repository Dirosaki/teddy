import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type AuthStore = {
	loggedIn: boolean
}

type AuthActions = {
	logout: () => void
	setLoggedIn: (username: string) => void
}

export type AuthSlice = AuthActions & AuthStore

export const useAuthStore = create<AuthSlice>()(
	devtools(
		immer((set) => ({
			loggedIn: !!localStorage.getItem('username'),

			logout: () => {
				localStorage.removeItem('username')
				set((store) => {
					store.loggedIn = false
				})
			},

			setLoggedIn: (username) => {
				localStorage.setItem('username', username)
				set((store) => {
					store.loggedIn = true
				})
			},
		})),
		{ enabled: import.meta.env.DEV }
	)
)
