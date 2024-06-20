import {useCubeStore} from "../model/store/CubeStore";
import {useShallow} from "zustand/react/shallow";

export const BetSizePanel = () => {
	const { betSize, setBetSize } = useCubeStore(
			useShallow(({betSize, setBetSize}) => ({
				betSize,
				setBetSize
			}))
	)

	return (
			<div>
				Размер ставки {betSize} <br/>
				<select value={betSize} onChange={(e) => setBetSize(e.target?.value)}>
					<option value="1">1.00</option>
					<option value="5">5.00</option>
					<option value="10">10.00</option>
					<option value="15">15.00</option>
					<option value="20">20.00</option>
				</select>
			</div>
	);
};