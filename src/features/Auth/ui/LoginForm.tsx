import {useAuthStore} from "../model/store/AuthStore";
import {useShallow} from "zustand/react/shallow";
import {useState} from "react";

interface LoginFormProps {
	onSuccess?: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
	const {onSuccess = () => {}} = props;
	const [valueError, setValueError] = useState(false);
	const {login, password, loginByUsername, setLogin, setPassword} = useAuthStore(
			useShallow(({login, password, loginByUsername, setLogin, setPassword}) => ({
				login,
				password,
				loginByUsername,
				setLogin,
				setPassword
			}))
	)

	const onSubmit = async () => {
		if(!login.trim() || !password.trim()) {
			setValueError(true)
		} else {
			setValueError(false);
			const response = await loginByUsername({
				login,
				password
			})

			if(response?.status === 200) {
				onSuccess();
			}
		}
	}

	return (
			<div>
				<input type="text" placeholder="Введите логин" value={login} onChange={(e) => setLogin(e.target.value)}/>
				<input type="text" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>

				<br/>
				{valueError && 'Введите логин/пароль'}

				<br/>
				<button onClick={onSubmit}>Войти</button>
			</div>
	)
}