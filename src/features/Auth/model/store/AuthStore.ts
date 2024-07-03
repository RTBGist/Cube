import { create } from 'zustand'
import {fetchAPI, IData} from "src/shared/lib/fetchAPI";


interface AuthState {
	isLoading: boolean,
	isAuth: boolean,
	login: string,
	password: string,

	setLogin: (login: string) => void,
	setPassword: (password: string) => void,
	setIsAuth: (isAuth: boolean) => void,
	loginByUsername: (data: IData) => void,
	checkAuth: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
	isLoading: false,
	login: '',
	password: '',
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
			set(() => ({isAuth: true}))

			return response;
		} catch (e) {
			console.error('loginByUsername error:', e);
		} finally {
			set(() => ({isLoading: false}))
		}
	},
	checkAuth: async () => {
		try {
			set(() => ({isLoading: true}))
			const response = await fetchAPI('https://api.lettobet.dev.bet4skill.com/api/auth/me', null, 'GET');

			if(response?.status === 401) {
				throw new Error()
			}

			set(() => ({isAuth: true}))
			localStorage.setItem('userAuth', 'true');
		} catch (e) {
			console.log('error /me', e)

			localStorage.setItem('userAuth', 'false');
			set(() => ({isAuth: false}))
		} finally {
			set(() => ({isLoading: false}))
		}
	}
}))