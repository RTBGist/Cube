import {useAuthStore} from "../model/store/AuthStore";
import {useShallow} from "zustand/react/shallow";


export const LoginForm = () => {
	const {login, password, loginByUsername, setLogin, setPassword} = useAuthStore(
			useShallow(({login, password, loginByUsername, setLogin, setPassword}) => ({
				login,
				password,
				loginByUsername,
				setLogin,
				setPassword
			}))
	)

	const onSubmit = () => {
		loginByUsername({
			login,
			password
		})
	}

	return (
			<div>
				<input type="text" placeholder="Введите логин" value={login} onChange={(e) => setLogin(e.target.value)}/>
				<input type="text" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>

				<button onClick={onSubmit}>Войти</button>
			</div>
	)
}