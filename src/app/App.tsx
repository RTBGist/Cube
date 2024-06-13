import {useState} from "react";

function App() {
  const [balance, setBalance] = useState(100);
  const [betOption, setBetOption] = useState(null);
  const [betSize, setBetSize] = useState(1);
  const [currentBetNumber, setCurrentBetNumber] = useState(1);

  const onSelectBid = (event) => {
    setBetSize(event.target?.value)
  }

  const onChangeCurrentBetNumber = (event) => {
    let resultNumber = event.target?.value;

    // TODO обработку, чтоб значения были от 1 до 6
    setCurrentBetNumber(+resultNumber)
    setBetOption(resultNumber)
  }

  const onPlayGame = () => {
    const newNumber = Math.floor(Math.random() * 6) + 1;
    const evenArr = [2,4,6];
    const oddArr = [1,3,5];
    const onetothree = [1,2,3];
    const fourtosix = [4,5,6];

    if(betOption === newNumber) {
      console.log('x3')
      setBalance((prevBalance) => prevBalance + betSize * 3)
      return;
    }

    if(betOption === 'От 1 до 3' && onetothree.includes(newNumber)){
      console.log('x2')
      setBalance((prevBalance) => prevBalance + betSize * 2)
      return;
    }

    if(betOption === 'От 4 до 6' && fourtosix.includes(newNumber)){
      console.log('x2')
      setBalance((prevBalance) => prevBalance + betSize * 2)
      return;
    }

    if(betOption === 'Четное' && evenArr.includes(newNumber)) {
      console.log('x2')
      setBalance((prevBalance) => prevBalance + betSize * 2)
      return;
    }
    if(betOption === 'Нечетное' && oddArr.includes(newNumber)) {
      console.log('x2')
      setBalance((prevBalance) => prevBalance + betSize * 2)
      return;
    }

    setBalance((prevBalance) => prevBalance - betSize)
  }

  return (
      <>
        <div>
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

          <div onClick={() => setBetOption('Четное')}>Четное</div>
          <div onClick={() => setBetOption('Нечетное')}>Нечетное</div>
          <div onClick={() => setBetOption('От 1 до 3')}>От 1 до 3</div>
          <div onClick={() => setBetOption('От 4 до 6')}>От 4 до 6</div>
          <div onClick={() => setBetOption(currentBetNumber)}>
            Конкретное число
            <input type="number" value={currentBetNumber} onChange={onChangeCurrentBetNumber} placeholder="1" />
          </div>
        </div>

        <button onClick={onPlayGame} disabled={!betOption}>Сделать ставку</button>
      </>
  )
}

export default App
