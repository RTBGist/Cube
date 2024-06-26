import { create } from 'zustand'
import { fetchAPI } from "src/shared/lib/fetchAPI";


interface AuthState {
	isLoading: boolean,
	isAuth: boolean,
	login: string,
	password: string,

	setLogin: (login: string) => void,
	setPassword: (password: string) => void,
	setIsAuth: (isAuth: boolean) => void,
	loginByUsername: (data) => void,
}

export const useAuthStore = create<AuthState>()((set) => ({
	isLoading: false,
	login: 'test_player_try',
	password: 'test_player_try',
	isAuth: false,

	setLogin: (login) => set(() => ({ login })),
	setPassword: (password) => set(() => ({ password })),
	setIsAuth: (isAuth) => set(() => ({ isAuth })),
	
	loginByUsername: async (data) => {
		try {
			set(() => ({isLoading: true}))
			const response = await fetchAPI('https://api.lettobet.dev.bet4skill.com/api/client-login', data, 'POST');

			if(!response) {
				throw new Error()
			}

			localStorage.setItem('userAuth', 'true');
			set(() => ({isLoading: false, isAuth: true}))
		} catch (e) {
			set(() => ({isLoading: false, isAuth: false}))
			localStorage.setItem('userAuth', 'false');
			console.error('loginByUsername error:', e);
		}
	}
}))