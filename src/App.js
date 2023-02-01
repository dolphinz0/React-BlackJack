import "./App.css";
import { useState } from "react";

import UserCards from "./components/UserCards";
import Deck from "./components/Deck";
import BettingTable from "./components/betting/BettingTable";

function App() {
  const [deck, setDeck] = useState(() => {
    let id, rank, suit, obj, value, arr;

    arr = [];

    for (let j = 0; j < 4; j++) {
      for (let i = 1; i < 14; i++) {
        obj = {};
        if (j === 0) suit = "spades";
        if (j === 1) suit = "hearts";
        if (j === 2) suit = "diamonds";
        if (j === 3) suit = "clubs";
        rank = i;
        value = i;
        if (rank === 1) {
          rank = "ace";
          value = 11;
        }
        if (rank === 11) {
          rank = "jack";
          value = 10;
        }
        if (rank === 12) {
          rank = "queen";
          value = 10;
        }
        if (rank === 13) {
          rank = "king";
          value = 10;
        }
        if (typeof rank == "string") id = rank.charAt(0) + suit.charAt(0);
        else id = rank + suit.charAt(0);
        obj["id"] = id;
        obj["suit"] = suit;
        obj["rank"] = rank;
        obj["value"] = value;
        arr.push(obj);
      }
    }

    return arr.sort(()=>Math.random()-Math.random());
  });

  const [counter, setCounter] = useState(4);

  const [isBetting, setIsBetting] = useState(true);

  const [pool, setPool] = useState(0);
  const [money, setMoney] = useState(500);

  const [userCards, setUserCards] = useState([deck[0], deck[1]]);
  const [userCardsTotal, setUserCardsTotal] = useState(userCards.reduce((acc, val)=>acc+val.value,0));

  const [dealerCards, setDealerCards] = useState([deck[2]]);
  const [dealerCardsTotal, setDealerCardsTotal] = useState(dealerCards.reduce((acc, val)=>acc+val.value,0));

  const [isGameOver, setIsGameOver] = useState(false);

  let betAmounts = [1, 5, 10, 50, 100];

  const addUserCardHandler = () => {
    const card = deck[counter];
    setUserCardsTotal((prevState) => prevState + card.value);
    setUserCards((prevState) => [...prevState, card]);
    if (userCardsTotal + card.value >= 21) {
      stopHandler();
    }
    setCounter(prev=>prev+1);
  };

  const stopHandler = () => {
    let dealerValue = dealerCardsTotal;
    while (dealerValue < 17) {
      const card = deck[Math.floor(Math.random() * deck.length)];
      dealerValue += card.value;
      setDealerCards((prevState) => [...prevState, card]);
    }
    setDealerCardsTotal(dealerValue);
    setIsGameOver(true);
  };

  const continueHandler = (event) => {
    setDealerCards([deck[0]]);
    setDealerCardsTotal(deck[0].value);
    setUserCards([deck[2], deck[3]]);
    setUserCardsTotal(deck[2].value+deck[3].value);
    setIsGameOver(false);
    setIsBetting(true);
    moneyHandler(event.target.attributes.something.nodeValue);
    setDeck(prevDeck=>prevDeck.sort(()=>Math.random()-Math.random()))
  };

  const finalBetHandler = (amount) => {
    setIsBetting(false);
    setPool(amount);
  };

  const moneyHandler = (winMessage) => {
    if (winMessage.indexOf("User Wins!") !== -1)
      setMoney((prevState) => prevState + pool * 2);
    else if (winMessage.indexOf("Tie") !== -1) return;
    else setMoney((prevState) => prevState - pool);
  };

  let content = [];

  if (isBetting) {
    content = (
      <BettingTable
        bets={betAmounts}
        total={money}
        onFinalBet={finalBetHandler}
      />
    );
  } else {
    content = [
      <UserCards id="dealer" cards={dealerCards} total={dealerCardsTotal} />,
      <Deck
        gameOver={isGameOver}
        onAddUserCard={addUserCardHandler}
        onStop={stopHandler}
      />,
      <UserCards id="user" cards={userCards} total={userCardsTotal} />,
    ];
  }

  if (isGameOver) {
    let winMessage = "";
    if (dealerCardsTotal < 21) {
      if (userCardsTotal < 21) {
        if (dealerCardsTotal > userCardsTotal) winMessage = "Dealer Wins!";
        else winMessage = "User Wins!";
      } else if (userCardsTotal === 21) {
        winMessage = "User BlackJacks! User Wins!";
      } else winMessage = "User Busts. Dealer Wins!";
    } else if (dealerCardsTotal === 21) {
      winMessage += "Dealer BlackJack! ";
      if (userCardsTotal < 21) {
        winMessage += "Dealer Wins!";
      } else if (userCardsTotal === 21) {
        winMessage += "User BlackJacks! Tie!";
      } else winMessage += "User Busts. Dealer Wins!";
    } else {
      winMessage += "Dealer Busts. ";
      if (userCardsTotal < 21) {
        winMessage = "User Wins!";
      } else if (userCardsTotal === 21) {
        winMessage += "User BlackJacks! User Wins!";
      } else winMessage += "User Busts. Tie!";
    }
    let temp = content.shift();
    content.shift();
    content.unshift([
      <h2 className='win-message'>{winMessage}</h2>,
      <button className='continue-button' onClick={continueHandler} something={winMessage}>
        Click me to continue
      </button>,
    ]);
    content.unshift(temp);
  }

  console.log("App rendered");

  return <div className="App">{content}</div>;
}

export default App;
