import BettingButton from "./BettingButton";
import { useState } from "react";

import "./BettingTable.css";

function BettingTable(props) {
  const [finalBet, setFinalBet] = useState(0);

  const addAmountHandler = (amount) => {
    if (finalBet + amount > props.total) return;
    setFinalBet((prevState) => prevState + amount);
  };

  const finalizeBetHandler = () => {
    props.onFinalBet(finalBet);
  };

  const resetHandler = () => {
    setFinalBet(0);
  };

  return (
    <div>
      <div className="total-container">
        <div className="total">${finalBet}</div>
        <button onClick={finalizeBetHandler}>Finalize Bet</button>
      </div>
      <div className="money">You have: ${props.total}</div>
      <div>Add Bets:</div>
      {props.bets.map((bet) => (
        <BettingButton
          key={bet}
          amount={bet}
          onAddAmount={addAmountHandler}
        />
      ))}
      <div className="reset">
        <button onClick={resetHandler}>Reset Bet</button>
      </div>
    </div>
  );
}

export default BettingTable;
