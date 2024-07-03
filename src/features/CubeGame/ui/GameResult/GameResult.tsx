import {useShallow} from "zustand/react/shallow";
import {ResultOptions} from "../../model/types/types";
import {useCubeStore} from "src/features/CubeGame";
import {useAuthStore} from "src/features/Auth";

export const GameResult = () => {
	const { rolledNumber, result, winningAmount } = useCubeStore(
			useShallow(({rolledNumber, result, winningAmount}) => ({
				rolledNumber,
				result,
				winningAmount
			}))
	)

	const isAuth  = useAuthStore((state) => state.isAuth)

	return (
			<div>
				{!isAuth ? 'Войдите, чтобы продолжить' : 'Сделайте ставку'}
				<br/>
				<br/>
				{rolledNumber !== null && <p>Результат броска кубика: {rolledNumber}</p>}
				{result && <p>{result === ResultOptions.WIN ? `Вы выиграли ${winningAmount} TND!` : 'Повезет в следующий раз!'}</p>}
			</div>
	);
};