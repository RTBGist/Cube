import { create } from 'zustand'
import {fetchAPI} from "src/shared/lib/fetchAPI";


interface AuthState {
	isLoading: boolean,
	login: string,
	password: string,
}

export const useAuthStore = create<AuthState>()((set) => ({
	isLoading: false,
	login: 'test_player_try',
	password: 'test_player_try',

	setLogin: (login: string) => set(() => ({ login })),
	setPassword: (password: string) => set(() => ({ password })),
	
	loginByUsername: async (data) => {
		try {
			const response = await fetchAPI('https://api.lettobet.dev.bet4skill.com/api/client-login', data, 'POST');

			if(!response) {
				throw new Error()
			}
			set(() => ({isLoading: false}))
		} catch (e) {
			set(() => ({isLoading: false}))
			console.error(e);
		}
	}
}))