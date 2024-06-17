import { create } from 'zustand'
import {BetOptions, DiceNumberType, ResultType} from "../types/types";

interface CubeState {
	balance: number,
	betSize: number,
	betOption: BetOptions,
	currentBetNumber: DiceNumberType,
	rolledNumber: DiceNumberType,
	result: ResultType,

}

const useCubeStore = create<CubeState>()((set) => ({
	balance: 100,
	betSize: 1,
	betOption: null,
	currentBetNumber: 1,
	rolledNumber: null,
	result: null,

	setBetSize: (betSize) => set(() => ({ betSize }))
}))