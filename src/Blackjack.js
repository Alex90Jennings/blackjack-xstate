import "./index.css";
import Header from "./Header";
import Dealer from "./Dealer";
import Player from "./Player";
import Rules from "./Rules";


const cardValue = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 10,
  12: 10,
  13: 10,
  14: 1,
};

let doubled = false;


function Blackjack(props) {
  const dealerHand = props.dealerHand;
  const setDealerHand = props.setDealerHand;
  const playerHand = props.playerHand;
  const setAIState = props.setAIState;
  const gameState= props.gameState
  const setGameState= props.setGameState
  const result = props.result
  const bet = props.bet
  const setBet = props.setBet
  const wallet = props.wallet
  const cardDeck = props.cardDeck
  const setPlayerHand = props.setPlayerHand

  const dealCard = () => {
    if (cardDeck.length > 0) {
      const randomIndex = Math.floor(Math.random() * cardDeck.length);
      const cardToDeal = cardDeck[randomIndex];
      cardDeck.splice(randomIndex, 1);
      console.log(cardToDeal);
      return cardToDeal;
    }
    return false;
  };

  const dealCardToPlayer = () => {
    const newCard = dealCard();
    setPlayerHand([...playerHand, newCard]);
  };

  const handHasAce = (hand) => {
    for (let i = 0; i < hand.length; i++) {
      const numberOfCard = hand[i].number;
      if (numberOfCard === 14) {
        return true;
      }
    }
    return false;
  };

  const countScore = (hand) => {
    let sum = 0;
    let aceIsEleven = false;
    let makeElevenAceOne = false;
    for (let i = 0; i < hand.length; i++) {
      const numberOfCard = hand[i].number;
      const valueOfCard = cardValue[numberOfCard];
      if (handHasAce(hand)) {
        if (numberOfCard === 14 && !aceIsEleven) {
          aceIsEleven = true;
          sum += 10;
        }
        sum += valueOfCard;
        if (sum > 21 && !makeElevenAceOne) {
          makeElevenAceOne = true;
          sum = sum - 10;
        }
      } else sum += valueOfCard;
    }
    return sum;
  };

  const isTwentyOne = (hand) => {
    if (countScore(hand) === 21) {
      if (hand.length === 2) {
        return "BLACKJACK";
      } else return 21;
    } else return countScore(hand);
  };

  const isBust = (hand) => {
    if (countScore(hand) < 22) {
      return false;
    }
    return true;
  };

  
  const dealerPlaysHand = () => {
    if (countScore(dealerHand) < 17) {
      setAIState("drawing a card");
    }
    if (countScore(dealerHand) > 16) setAIState("end game");
  };

  return (
    <div className="App main-container">
      <Header />
      <Dealer
        dealerHand={dealerHand}
        setDealerHand={setDealerHand}
        countScore={countScore}
        isBust={isBust}
        gameState={gameState}
        setGameState={setGameState}
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
        setGameState={setGameState}
        result={result}
        bet={bet}
        setBet={setBet}
        wallet={wallet}
        doubled={doubled}
      />
      <Rules />
    </div>
  );
}

export default Blackjack;
