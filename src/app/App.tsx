import {useShallow} from "zustand/react/shallow";
import {BetOptionsPanel, BetSizePanel, GameResult, useCubeStore} from "src/features/CubeGame";
import {BetOptions, DiceNumberType, ResultOptions} from "src/features/CubeGame/model/types/types";
import {useAuthStore} from "src/features/Auth";
import {Header} from "src/widgets/Header";


function App() {
  const { betSize, balance, setBalance, betOption, currentBetNumber, setRolledNumber, setResult, setWinningAmount } = useCubeStore(
      useShallow(({betSize, balance, setBalance, betOption, currentBetNumber, setRolledNumber, setResult, setWinningAmount}) => ({
        betSize,
        balance,
        setBalance,
        betOption,
        currentBetNumber,
        setRolledNumber,
        setResult,
        setWinningAmount
      }))
  )
  const isAuth = useAuthStore((state) => state.isAuth);

  const onPlayGame = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1 as DiceNumberType;
    setRolledNumber(randomNumber);
    let win = false;

    switch (betOption) {
      case BetOptions.EVEN:
        win = randomNumber % 2 === 0
        break;
      case BetOptions.ODD:
        win = randomNumber % 2 !== 0
        break;
      case BetOptions.FROM_ONE_TO_THREE:
        win = randomNumber >= 1 && randomNumber <= 3
        break;
      case BetOptions.FROM_FOUR_TO_SIX:
        win = randomNumber >= 4 && randomNumber <= 6
        break;
      case BetOptions.NUMBER:
        win = randomNumber === currentBetNumber;
        break;
    }

    if(win) {
      if(betOption === BetOptions.NUMBER) {
        setBalance(balance + betSize * 3)
        setWinningAmount(betSize * 3)
      } else {
        setBalance(balance + betSize * 2)
        setWinningAmount(betSize * 2)
      }
      setResult(ResultOptions.WIN);
    } else {
      setBalance(balance - betSize)
      setResult(ResultOptions.LOSE);
    }
  }

  return (
      <>
        <Header />

        Баланс {balance} <br/>

        <GameResult />
        <BetSizePanel />
        <BetOptionsPanel />
        <button onClick={onPlayGame} disabled={!betOption || !isAuth}>Сделать ставку</button>
      </>
  )
}

export default App
