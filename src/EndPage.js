import { Link } from "react-router-dom";

let adjustedWallet = false;

function EndPage(props) {
  const result = props.result;
  const setGameState = props.setGameState;
  const setPlayerHand = props.setPlayerHand;
  const setDealerHand = props.setDealerHand;
  const setCardDeck = props.setCardDeck;
  const setAIState = props.setAIState;
  const setResult = props.setResult;
  const wallet = props.wallet;
  const setWallet = props.setWallet;
  const bet = props.bet;

  if (result === "YOU WIN" && !adjustedWallet) {
    adjustedWallet = true;
    setWallet(wallet + bet);
  }
  if (result === "YOU WIN DOUBLE" && !adjustedWallet) {
    adjustedWallet = true;
    setWallet(wallet + bet + bet);
  }
  if (result === "YOU LOSE" && !adjustedWallet) {
    adjustedWallet = true;
    setWallet(wallet - bet);
  }

  const handleClick = () => {
    adjustedWallet = false;
    setPlayerHand([]);
    setDealerHand([]);
    setCardDeck([]);
    setAIState("waiting");
    setResult(null);
    setGameState("retrieve deck of cards");
  };

  return (
    <div className="centering">
      <div className="three-columns-expand-one-three">
        <div></div>
        <div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <div>
              <div className="three-columns-expand-one-three">
                <div></div>
                <h1>{wallet > 0 ? `${result}` : "YOU LOST ALL YOUR MONEY"} </h1>
                <div></div>
              </div>
              <div className="three-columns-expand-one-three">
                <div></div>
                <h2>REMAINING BALANCE: {`${wallet}`}</h2>
                <div></div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="three-columns-expand-one-three">
            <div></div>
            {wallet > 0 ? (
              <button className="center-wrapper" onClick={() => handleClick()}>
                <Link to="/play">PLAY AGAIN</Link>
              </button>
            ) : (
              ""
            )}
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default EndPage;
