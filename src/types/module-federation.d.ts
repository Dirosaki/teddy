type AuthStore = {
	loggedIn: boolean
}

type AuthActions = {
	logout: () => void
	setLoggedIn: (state: boolean) => void
}

type AuthSlice = AuthActions & AuthStore

declare module 'components/*'
declare module 'auth/*'
declare module 'partners/*'
