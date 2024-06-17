import {useState} from "react";
import {BetOptions, ResultOptions, ResultType} from "../features/CubeGame/model/types/types";

function App() {
  const [balance, setBalance] = useState(100);
  const [betSize, setBetSize] = useState(1);
  const [betOption, setBetOption] = useState<BetOptions>(null);
  const [currentBetNumber, setCurrentBetNumber] = useState(1);
  const [rolledNumber, setRolledNumber] = useState<number>(null);
  const [result, setResult] = useState<ResultType>(null);

  const onSelectBid = (event) => {
    setBetSize(event.target?.value)
  }

  const onChangeCurrentBetNumber = (event) => {
    let resultNumber = +event.target?.value;

    // TODO обработку, чтоб значения были от 1 до 6
    setCurrentBetNumber(resultNumber)
  }

  const onPlayGame = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
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
      } else {
        setBalance(balance + betSize * 2)
      }
      setResult(ResultOptions.WIN);
    } else {
      setBalance(balance - betSize)
      setResult(ResultOptions.LOSE);
    }
  }

  return (
      <>
        <div>
          {rolledNumber !== null && <p>Rolled number: {rolledNumber}</p>}
          {result && <p>{result === ResultOptions.WIN ? 'Вы победили!' : 'Вы проиграли!'}</p>}

          Баланс {balance} <br/>
          Размер ставки {betSize} <br/>
          <select value={betSize} onChange={onSelectBid}>
            <option value="1">1.00</option>
            <option value="5">5.00</option>
            <option value="10">10.00</option>
            <option value="15">15.00</option>
            <option value="20">20.00</option>
          </select>
        </div>

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

        <button onClick={onPlayGame} disabled={!betOption}>Сделать ставку</button>
      </>
  )
}

export default App
