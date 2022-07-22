import "./index.css";
import Header from "./Header";
import Dealer from "./Dealer";
import Player from "./Player";
import Rules from "./Rules";


function Blackjack(props) {
  const dealerHand = props.dealerHand;
  const setDealerHand = props.setDealerHand;
  const playerHand = props.playerHand;
  const setAIState = props.setAIState;
  const gameState= props.gameState
  const send = props.send
  const result = props.result
  const bet = props.bet
  const setBet = props.setBet
  const wallet = props.wallet
  const cardDeck = props.cardDeck
  const setPlayerHand = props.setPlayerHand
  const doubled = props.doubled
  const countScore = props.countScore
  const isBust = props.isBust  
  const dealCardToPlayer = props.dealCardToPlayer
  const isTwentyOne = props.isTwentyOne
  const dealerPlaysHand = props.dealerPlaysHand

  return (
    <div className="App main-container">
      <Header />
      <Dealer
        dealerHand={dealerHand}
        setDealerHand={setDealerHand}
        countScore={countScore}
        isBust={isBust}
        gameState={gameState}
        send={send}
      />
      <Player
        playerHand={playerHand}
        dealerHand={dealerHand}
        dealCardToPlayer={dealCardToPlayer}
        countScore={countScore}
        dealerPlaysHand={dealerPlaysHand}
        isBust={isBust}
        isTwentyOne={isTwentyOne}
        setAIState={setAIState}
        gameState={gameState}
        send={send}
        result={result}
        bet={bet}
        setBet={setBet}
        wallet={wallet}
        doubled={doubled}
        cardDeck={cardDeck}
      />
      <Rules />
    </div>
  );
}

export default Blackjack;
