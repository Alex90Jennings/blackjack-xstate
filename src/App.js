import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import "./index.css";
import Blackjack from "./Blackjack";
import EndPage from "./EndPage";
import StartPage from "./StartPage";
import { createMachine, interpret, assign  } from 'xstate';
import { useMachine  } from '@xstate/react';

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

export default function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [AIState, setAIState] = useState("waiting");
  const [result, setResult] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [wallet, setWallet] = useState(1000);
  const [bet, setBet] = useState(250);
  const [cardDeck, setCardDeck] = useState([]);

  const dealCard = (cards) => {
    console.log("dealing card")
    console.log("cards ", cards)
    if (blackjackCards.length > 0) {
      console.log("blackjackCardGame has more than 0 cards")
      const randomIndex = Math.floor(Math.random() * blackjackCards.length);
      const cardToDeal = blackjackCards[randomIndex];
      blackjackCards.splice(randomIndex, 1);
      return cardToDeal;
    }
    console.log("blackjackCardGame has 0 cards")
    return false;
  };

  const dealCardToPlayer = () => {
    console.log("dealing card to player")
    const newCard = dealCard();
    setPlayerHand([...playerHand, newCard]);
  };

  const dealCardToDealer = () => {
    console.log("dealing card to dealer")
    const newCard = dealCard();
    setDealerHand([...dealerHand, newCard]);
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

  const retrieveNewDeckOfCards = () => {
    console.log("getting cards")
    const suits = ["clubs", "diamonds", "hearts", "spades"];
    const cards = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 2; j < 15; j++) {
        const card = { number: j, suit: suits[i] };
        cards.push(card);
      }
    }
    setCardDeck(cards)
  };
  
  const dealerPlaysHand = () => {
    if (countScore(dealerHand) < 17) {
      setAIState("drawing a card");
    }
    if (countScore(dealerHand) > 16) setAIState("end game");
  };

  const blackjackCardGame = createMachine({
    id: 'blackjack',
    context: {
      cardDeck: []
    },
    "initial": "start page",
    states: {
      "start page": {
        on: {
          "SWITCH_BETTING": {
            target: "betting"
          }
        }
      },
      "betting": {
        entry: ["retrieveNewDeckOfCards"],
        exit: ["setContextDeckOfCards"],
        on: {
          "SWITCH_PLAYER-DECISION": {
            target: "player decision"
          }
        },
      },
      "player decision": {
        entry: ["initialiseGame"],
        on: {
          "SWITCH_PLAYERSTAND": {
            target: "player stand"
          }
        }
      },
      "player stand": {
        on: {
          "SWITCH_DEALER-AI": {
            target: "dealer ai"
          }
        }
      },
      "dealer ai": {
        on: {
          "SWITCH_COMPARESCORES": {
            target: "compare scores"
          }
        }
      },
      "compare scores": {
        on: {
          "SWITCH_ENDGAME": {
            target: "end game"
          }
        }
      },
      "end game": {
        on: {
          "SWITCH_GAMEOVER": {
            target: "game over"
          }
        }
      },
      "game over": {
      },
    }
  },
    {
      actions: {
        retrieveNewDeckOfCards: (context, event) => {
          if (context.cardDeck.length === 0) retrieveNewDeckOfCards()
          console.log("retrieved new deck in state: ", cardDeck.length)
        },
        setContextDeckOfCards: (context, event) => {
          console.log(event.data)
          blackjackCardGame.context.cardDeck = event.data
          console.log(blackjackCardGame.context.cardDeck)
        },
        initialiseGame: (context) => {
            console.log(blackjackCardGame.context.cardDeck)
            dealCardToPlayer(blackjackCardGame.context.cardDeck)
            dealCardToPlayer(blackjackCardGame.context.cardDeck)
            dealCardToDealer(blackjackCardGame.context.cardDeck)
        }
      }
    }
  )
  const blackjackCards = blackjackCardGame.context.cardDeck
  const [state, send] = useMachine(blackjackCardGame)

  const suitsCardGameService = interpret(blackjackCardGame).onTransition((state) =>
  console.log(state.value)
  );

  suitsCardGameService.start();
  suitsCardGameService.send({ type: 'RESOLVE' });

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<StartPage send={send} cardDeck={cardDeck} />} />
          <Route
            path="/play"
            element={
              <Blackjack
                cardDeck={cardDeck}
                dealerHand={dealerHand}
                playerHand={playerHand}
                send={send}
                setDealerHand={setDealerHand}
                setPlayerHand={setPlayerHand}
                result={result}
                wallet={wallet}
                setWallet={setWallet}
                bet={bet}
                setBet={setBet}
                isBust={isBust}
                countScore={countScore}
                doubled={doubled}
                dealCardToPlayer={dealCardToPlayer}
                isTwentyOne={isTwentyOne}
                dealerPlaysHand={dealerPlaysHand}
              />
            }
          />
          <Route
            path="/end"
            element={
              <EndPage
                setGameState={setGameState}
                setAIState={setAIState}
                setPlayerHand={setPlayerHand}
                setDealerHand={setDealerHand}
                setResult={setResult}
                result={result}
                wallet={wallet}
                setWallet={setWallet}
                bet={bet}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}