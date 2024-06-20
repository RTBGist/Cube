import { create } from 'zustand'
import {BetOptions, DiceNumberType, ResultType} from "../types/types";

interface CubeState {
	balance: number,
	betSize: number,
	betOption: BetOptions,
	currentBetNumber: DiceNumberType,
	rolledNumber: DiceNumberType,
	result: ResultType,
	winningAmount: number,

	setBetSize: (betSize: number) => void,
	setBalance: (balance: number) => void,
	setBetOption: (betOption: BetOptions) => void,
	setCurrentBetNumber: (currentBetNumber: DiceNumberType) => void,
	setRolledNumber: (rolledNumber: DiceNumberType) => void,
	setResult: (result: ResultType) => void,
	setWinningAmount: (winningAmount: number) => void
}

export const useCubeStore = create<CubeState>()((set) => ({
	balance: 100,
	betSize: 1,
	betOption: null,
	currentBetNumber: 1,
	rolledNumber: null,
	result: null,
	winningAmount: 0,

	setBetSize: (betSize) => set(() => ({ betSize: betSize })),
	setBalance: (balance) => set(() => ({ balance: balance })),
	setBetOption: (betOption) => set(() => ({ betOption: betOption })),
	setCurrentBetNumber: (currentBetNumber) => set(() => ({ currentBetNumber: currentBetNumber })),
	setRolledNumber: (rolledNumber) => set(() => ({ rolledNumber: rolledNumber })),
	setResult: (result) => set(() => ({ result: result })),
	setWinningAmount: (winningAmount) => set(() => ({ winningAmount: winningAmount })),
}))