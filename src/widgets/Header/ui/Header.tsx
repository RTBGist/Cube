import {useEffect, useState} from "react";
import {LoginModal} from "src/features/Auth/ui/LoginModal";
import {useAuthStore} from "src/features/Auth";
import {useShallow} from "zustand/react/shallow";
import * as cls from './Header.module.scss';


export const Header = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isAuth, setIsAuth, checkAuth } = useAuthStore(
			useShallow(({isAuth, setIsAuth, checkAuth}) => ({
				isAuth,
				setIsAuth,
				checkAuth
			}))
	)

	useEffect(() => {
		if(localStorage.getItem('userAuth') === 'true') {
			setIsAuth(true);
			checkAuth()
		}
	}, []);

	return (
			<header>
				<div className={cls.content}>
					<span>Test Game</span>

					{isAuth ?
							<div>119 999 911.10 (TND)</div>
							:
							<button onClick={() => setIsModalOpen(true)}>вход</button>
					}
				</div>

				<LoginModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
			</header>
	);
};