function BettingButton(props) {
    const clickHandler = () => {
        props.onAddAmount(props.amount);
    }
    return <button className="amount-button" onClick={clickHandler}>{props.amount}</button>
}

export default BettingButton;

d
sdknsalkjfhd;lksjahflkhaslkfjhsa
