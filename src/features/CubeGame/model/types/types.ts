export enum BetOptions {
	ODD = 'Нечетное',
	EVEN = 'Четное',
	NUMBER = 'Число',
	FROM_FOUR_TO_SIX = 'От 4 до 6',
	FROM_ONE_TO_THREE = 'От 1 до 3',
}

export enum ResultOptions {
	WIN = 'Победа',
	LOSE = 'Проигрыш'
}

export type DiceNumberType = 1 | 2 | 3 | 4 | 5 | 6;

export type ResultType = 'Победа' | 'Проигрыш';