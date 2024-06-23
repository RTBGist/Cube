import {useShallow} from "zustand/react/shallow";
import {ResultOptions} from "../model/types/types";
import {useCubeStore} from "src/features/CubeGame";

export const GameResult = () => {
	const { rolledNumber, result, winningAmount } = useCubeStore(
			useShallow(({rolledNumber, result, winningAmount}) => ({
				rolledNumber,
				result,
				winningAmount
			}))
	)

	return (
			<div>
				{result === null && <p><b>Сделайте ставку</b></p>}
				{rolledNumber !== null && <p>Результат броска кубика: {rolledNumber}</p>}
				{result && <p>{result === ResultOptions.WIN ? `Вы выиграли ${winningAmount} TND!` : 'Повезет в следующий раз!'}</p>}
			</div>
	);
};