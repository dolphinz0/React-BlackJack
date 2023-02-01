import './Card.css';

const Card = (props) => {
    return (<div className='card'>
        <img src={require(`../PNG-cards-1.3/${props.rank}_of_${props.suit}.png`)} alt={props.id}/>
    </div>)
}

export default Card;