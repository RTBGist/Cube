import {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {BetOptionsPanel, BetSizePanel, GameResult, useCubeStore} from "src/features/CubeGame";
import {BetOptions, DiceNumberType, ResultOptions} from "src/features/CubeGame/model/types/types";
import {LoginForm, useAuthStore} from "src/features/Auth";
import {fetchAPI} from "src/shared/lib/fetchAPI";


function App() {
  const { betSize, balance, setBalance, betOption, currentBetNumber, setRolledNumber, setResult, setWinningAmount } = useCubeStore(
      useShallow((state) => ({
        betSize: state.betSize,
        balance: state.balance,
        setBalance: state.setBalance,
        betOption: state.betOption,
        currentBetNumber: state.currentBetNumber,
        setRolledNumber: state.setRolledNumber,
        setResult: state.setResult,
        setWinningAmount: state.setWinningAmount,
      }))
  )

  const { isAuth, setIsAuth } = useAuthStore(
      useShallow((state) => ({
        isAuth: state.isAuth,
        setIsAuth: state.setIsAuth
      }))
  )

  useEffect(() => {
    if(localStorage.getItem('userAuth') === 'true') {
      setIsAuth(true);

      (async () => {
        try {
          const response = await fetchAPI('https://api.lettobet.dev.bet4skill.com/api/auth/me', null, 'GET');

          if(!response) {
            throw new Error()
          }
          setIsAuth(true);
        } catch (e) {
          console.log('error /me', e)
          setIsAuth(false);
        }
      })()
    }
  }, []);

  const onQuit = () => {
    setIsAuth(false);
    localStorage.setItem('userAuth', 'false');
  }

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
        {isAuth ?
            <>
              Вы уже авторизированы
              <button onClick={onQuit}>Выйти</button>
            </>
            :
            <LoginForm />
        }



        Баланс {balance} <br/>

        <GameResult />
        <BetSizePanel />
        <BetOptionsPanel />
        <button onClick={onPlayGame} disabled={!betOption}>Сделать ставку</button>
      </>
  )
}

export default App
