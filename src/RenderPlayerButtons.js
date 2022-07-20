import { Link } from "react-router-dom";

function RenderCards(props) {
  const hand = props.hand;
  const isBust = props.isBust;
  const dealCardToPlayer = props.dealCardToPlayer;
  const isTwentyOne = props.isTwentyOne;
  const setGameState = props.setGameState;
  const wallet = props.wallet;
  const dealerHand = props.dealerHand;
  const result = props.result;
  const bet = props.bet;
  const setBet = props.setBet;
  const countScore = props.countScore;
  const doubled = props.doubled;

  const increaseBetAmount = () => {
    if (wallet - bet >= 5) setBet(bet + 5);
  };

  const increaseBetAmountAlot = () => {
    if (wallet - bet >= 100) setBet(bet + 100);
  };

  const decreaseBetAmount = () => {
    if (bet > 5) setBet(bet - 5);
  };

  const decreaseBetAmountAlot = () => {
    if (bet > 105) setBet(bet - 100);
  };

  const canDouble = (hand) => {
    if (
      hand.length === 2 &&
      countScore(hand) < 12 &&
      countScore(hand) > 8 &&
      wallet > bet * 2
    )
      return true;
    return false;
  };

  return (
    <>
      {hand.length === 0 && (
        <ul className="seven-columns-expand-one-seven list-reset mg-m-bottom">
          <div></div>
          <li className="display-inline">
            <button onClick={() => decreaseBetAmountAlot()}>-100</button>
          </li>
          <li className="display-inline">
            <button onClick={() => decreaseBetAmount()}>-5</button>
          </li>
          <li className="display-inline">
            <button
              onClick={() => setGameState("initialise game")}
            >{`CLICK TO BET : ${bet}`}</button>
          </li>
          <li className="display-inline">
            <button onClick={() => increaseBetAmount()}>+5</button>
          </li>
          <li className="display-inline">
            <button onClick={() => increaseBetAmountAlot()}>+100</button>
          </li>
          <div></div>
        </ul>
      )}
      {!doubled &&
        !result &&
        !canDouble(hand) &&
        hand.length !== 0 &&
        isTwentyOne(hand) < 21 && (
          <ul className="four-columns-expand-one-four list-reset mg-m-bottom">
            <div></div>
            <li className="display-inline">
              <button onClick={() => dealCardToPlayer()}>HIT</button>
            </li>
            <li className="display-inline">
              <button onClick={() => setGameState("dealer AI")}>STAND</button>
            </li>
            <div></div>
          </ul>
        )}
      {canDouble(hand) && hand.length === 2 && (
        <ul className="five-columns-expand-one-five list-reset mg-m-bottom">
          <div></div>
          <li className="display-inline">
            <button onClick={() => dealCardToPlayer()}>HIT</button>
          </li>
          <li className="display-inline">
            <button onClick={() => setGameState("dealer AI")}>STAND</button>
          </li>
          <li className="display-inline">
            <button onClick={() => setGameState("double")}>DOUBLE</button>
          </li>
          <div></div>
        </ul>
      )}
      {doubled && countScore(hand) < 21 && (
        <ul className="three-columns-expand-one-three list-reset mg-m-bottom">
          <div></div>
          <li className="display-inline">
            <button onClick={() => setGameState("dealer AI")}>STAND</button>
          </li>
          <div></div>
        </ul>
      )}
      {!result && hand.length !== 0 && isBust(hand) && (
        <ul className="three-columns-expand-one-three list-reset mg-m-bottom">
          <div></div>
          <li className="display-inline">
            <button onClick={() => setGameState("end game")}>
              <Link to="/end">😱😱😱😱😱😱</Link>
            </button>
          </li>
          <div></div>
        </ul>
      )}
      {!result &&
        !result &&
        hand.length !== 0 &&
        (isTwentyOne(hand) === 21 || isBust(dealerHand)) && (
          <ul className="three-columns-expand-one-three list-reset mg-m-bottom">
            <div></div>
            <li className="display-inline">
              <button onClick={() => setGameState("dealer AI")}>
                🙂🙂🙂🙂🙂🙂
              </button>
            </li>
            <div></div>
          </ul>
        )}
      {!result && hand.length !== 0 && isTwentyOne(hand) === "BLACKJACK" && (
        <ul className="three-columns-expand-one-three list-reset mg-m-bottom">
          <div></div>
          <li className="display-inline">
            <button onClick={() => setGameState("dealer AI")}>
              😍😍😍😍😍😍
            </button>
          </li>
          <div></div>
        </ul>
      )}
      {!doubled && result && (
        <ul className="three-columns-expand-one-three list-reset mg-m-bottom">
          <div></div>
          <li className="display-inline">
            <button onClick={() => setGameState("dealer AI")}>
              <Link to="/end">
                {`${result}` === "IT'S A TIE"
                  ? `${result}`
                  : `${result} ${bet}`}
              </Link>
            </button>
          </li>
          <div></div>
        </ul>
      )}
    </>
  );
}

export default RenderCards;
