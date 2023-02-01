import "./Deck.css";

const Deck = (props) => {
  const hitHandler = () => {
    if (props.gameOver) return;
    props.onAddUserCard();
  };

  const standHandler = () => {
    if (props.gameOver) return;
    props.onStop();
  };

  console.log("Deck rendered");

  return (
    <div className="deck-container">
      <button className="hit-button" onClick={hitHandler}>
        Hit
      </button>
      <button className="stand-button" onClick={standHandler}>
        Stand
      </button>
    </div>
  );
};

export default Deck;
