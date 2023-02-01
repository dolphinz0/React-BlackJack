import Card from "./Card";
import "./Card.css";

const UserCards = (props) => {
  let content = "Click deck to get cards";

  let classname='card-container__user';

  if (props.id==='dealer') {classname = 'card-container__dealer'};

  if (props.cards.length > 0) {
    content = props.cards.map((card) => (
      <Card key = {card.id} id={card.id} suit={card.suit} rank={card.rank} value={card.value} />
    ));
  }

  return <div className={classname}>{content}<div>{props.total}</div></div>;
};

export default UserCards;
