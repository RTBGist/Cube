import {useShallow} from "zustand/react/shallow";
import {useCubeStore} from "src/features/CubeGame";
import {BetOptions, DiceNumberType} from "../../model/types/types";
import clsx from "clsx";
import * as cls from './BetOptionsPanel.module.scss';
import {ChangeEvent, useState} from "react";

export const BetOptionsPanel = () => {
	const [currentNumber, setCurrentNumber] = useState<string>('1');
	const { betOption, setBetOption, setCurrentBetNumber } = useCubeStore(
			useShallow(({betOption, setBetOption, setCurrentBetNumber}) => ({
				betOption,
				setBetOption,
				setCurrentBetNumber
			}))
	)

	const onChangeCurrentBetNumber = (event: ChangeEvent<HTMLInputElement>) => {
		const resultNumber = event.target?.value;
		const regex = /^[1-6]$/;

		setCurrentNumber(resultNumber);
		if(regex.test(resultNumber)) {
			setCurrentBetNumber(+resultNumber as DiceNumberType);
			setBetOption(BetOptions.NUMBER);
		} else {
			setBetOption(null);
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
					<input type="text" value={currentNumber} onChange={onChangeCurrentBetNumber} placeholder="Введите число от 1 до 6" />
					{!betOption && 'Введите значение от 1 до 6'}
				</div>

			</div>
	);
};
