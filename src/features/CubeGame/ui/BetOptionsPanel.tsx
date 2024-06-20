import {useShallow} from "zustand/react/shallow";
import {useCubeStore} from "../model/store/CubeStore";
import {BetOptions} from "../model/types/types";

export const BetOptionsPanel = () => {
	const { betOption, setBetOption, currentBetNumber, setCurrentBetNumber } = useCubeStore(
			useShallow(({betOption, setBetOption, currentBetNumber, setCurrentBetNumber}) => ({
				betOption,
				setBetOption,
				currentBetNumber,
				setCurrentBetNumber
			}))
	)

	const onChangeCurrentBetNumber = (event) => {
		let resultNumber = event.target?.value;

		if (/^\d*$/.test(resultNumber)) {
			const numValue = parseInt(resultNumber, 10);
			if (numValue >= 1 && numValue <= 6) {
				setCurrentBetNumber(resultNumber)
			}
		}
	}

	return (
			<div>
				Варианты ставок. {betOption}

				<div onClick={() => setBetOption(BetOptions.EVEN)}>Четное</div>
				<div onClick={() => setBetOption(BetOptions.ODD)}>Нечетное</div>
				<div onClick={() => setBetOption(BetOptions.FROM_ONE_TO_THREE)}>От 1 до 3</div>
				<div onClick={() => setBetOption(BetOptions.FROM_FOUR_TO_SIX)}>От 4 до 6</div>
				<div onClick={() => setBetOption(BetOptions.NUMBER)}>
					Конкретное число
					<input type="number" value={currentBetNumber} onChange={onChangeCurrentBetNumber} placeholder="1" />
				</div>
			</div>
	);
};
