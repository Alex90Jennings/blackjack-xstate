import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Blackjack from "./Blackjack";
import EndPage from "./EndPage";
import StartPage from "./StartPage";
import { createMachine, interpret } from 'xstate';
import { useMachine } from '@xstate/react';

const blackjackCardGame = createMachine({
  id: 'blackjack',
  "initial": "start page",
  states: {
    "start page": {
      on: {
        "SWITCH_STARTGAME": {
          target: "start game"
        }
      }
    },
    "start game": {
      on: {
        "SWITCH_BETTING": {
          target: "betting"
        }
      }
    },
    "betting": {
      on: {
        "SWITCH_DEALCARDS": {
          target: "player decision"
        }
      }
    },
    "player decision": {
      on: {
        "SWITCH_PLAYERSTAND": {
          target: "player stand"
        }
      }
    },
    "player stand": {
      on: {
        "SWITCH_DEALERAI": {
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
      on: {
        "SWITCH_STARTGAME": {
          target: "start game"
        }
      }
    },
  }
})

const suitsCardGameService = interpret(blackjackCardGame).onTransition((state) =>
  console.log(state.value)
);

suitsCardGameService.start();
suitsCardGameService.send({ type: 'RESOLVE' });

export default function App() {
  const [state, send] = useMachine(blackjackCardGame)

  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [cardDeck, setCardDeck] = useState([]);
  const [AIState, setAIState] = useState("waiting");
  const [result, setResult] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [wallet, setWallet] = useState(1000);
  const [bet, setBet] = useState(250);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<StartPage send={send} />} />
          <Route
            path="/play"
            element={
              <Blackjack
                cardDeck={cardDeck}
                setCardDeck={setCardDeck}
                dealerHand={dealerHand}
                playerHand={playerHand}
                setGameState={setGameState}
                setDealerHand={setDealerHand}
                setPlayerHand={setPlayerHand}
                result={result}
                wallet={wallet}
                setWallet={setWallet}
                bet={bet}
                setBet={setBet}
              />
            }
          />
          <Route
            path="/end"
            element={
              <EndPage
                setGameState={setGameState}
                setCardDeck={setCardDeck}
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