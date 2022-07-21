import { Link } from "react-router-dom";

function StartPage(props) {
  const send = props.send;

  return (
    <div className="centering">
      <div className="three-columns-expand-one-three">
        <div></div>
        <div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <div>
              <h1>PLAY A HAND?</h1>
            </div>
            <div></div>
          </div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <button onClick={() => send("SWITCH_BETTING")} className="center-wrapper">
              <Link to="/play">DEAL</Link>
            </button>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default StartPage;
