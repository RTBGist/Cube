import {create} from "zustand/esm";


interface AuthState {
	isLoading: boolean,
	username: string,
	password: string,
}

export const useAuthStore = create<AuthState>()((set) => ({
	isLoading: false,
	username: null,
	password: null,

	setUsername: (username: string) => set(() => ({ username })),
	setPassword: (password: string) => set(() => ({ password })),
	
	loginByUsername: async () => {
		try {
			
		} catch (e) {
			
		}
	}
}))