import RenderCards from "./RenderCards";

function Dealer(props) {
  const hand = props.dealerHand;
  const countScore = props.countScore;
  const isBust = props.isBust;
  const score = countScore(hand);

  return (
    <section className="center-wrapper">
      <div>
        <div className="three-columns-expand-one-three">
          <div></div>
          <h2>
            BOOLEAN DEALER SCORE - {isBust(hand) ? "BUST" : `${score}`}
          </h2>
          <div></div>
        </div>
        <div className="three-columns-expand-one-three">
          <div></div>
          <RenderCards hand={hand} />
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Dealer;
