import {useShallow} from "zustand/react/shallow";
import {useCubeStore} from "src/features/CubeGame";
import {BetOptions} from "../../model/types/types";
import clsx from "clsx";
import * as cls from './BetOptionsPanel.module.scss';

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

	const isOptionActive = (option: BetOptions) => {
		return betOption === option;
	}

	return (
			<div>
				Варианты ставок. {betOption}

				<div className={clsx(cls.option, isOptionActive(BetOptions.EVEN) && cls.active)} onClick={() => setBetOption(BetOptions.EVEN)}>Четное</div>
				<div className={clsx(cls.option, isOptionActive(BetOptions.ODD) && cls.active)} onClick={() => setBetOption(BetOptions.ODD)}>Нечетное</div>
				<div className={clsx(cls.option, isOptionActive(BetOptions.FROM_ONE_TO_THREE) && cls.active)} onClick={() => setBetOption(BetOptions.FROM_ONE_TO_THREE)}>От 1 до 3</div>
				<div className={clsx(cls.option, isOptionActive(BetOptions.FROM_FOUR_TO_SIX) && cls.active)} onClick={() => setBetOption(BetOptions.FROM_FOUR_TO_SIX)}>От 4 до 6</div>
				<div className={clsx(cls.option, isOptionActive(BetOptions.NUMBER) && cls.active)} onClick={() => setBetOption(BetOptions.NUMBER)}>
					Конкретное число
					<input type="number" value={currentBetNumber} onChange={onChangeCurrentBetNumber} placeholder="1" />
				</div>
			</div>
	);
};
