import './App.css';
import { createMachine, interpret } from 'xstate';
import { useMachine } from '@xstate/react';
import "./index.css";

const blackjackCardGame = createMachine({
  id: 'blackjack',
  "initial": "lobby",
  states: {
    "lobby": {
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

function App() {
  const [state, send] = useMachine(blackjackCardGame)

  return (<div className="App"></div>);
}

export default App;