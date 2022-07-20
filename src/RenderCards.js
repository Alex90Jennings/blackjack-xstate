
function RenderCards(props) {
  const cards = props.hand;

  return (
    <>
      {cards.length === 0 && (
        <ul className="list-reset display-inline">
          <li className="display-inline">
            <img src="./cards/card-back.png" className="card" alt="card-back" />
          </li>
          <li className="display-inline">
            <img src="./cards/card-back.png" className="card" alt="card-back" />
          </li>
        </ul>
      )}
      {cards.length === 1 && (
        <ul className="list-reset display-inline">
          <li className="display-inline" key={`${cards[0].number}_of_${cards[0].suit}`}>
            <img src={`./cards/${cards[0].number}_of_${cards[0].suit}.png`} className="card" alt={`${cards[0].number}_of_${cards[0].suit}`} />
          </li>
          <li className="display-inline">
            <img src="./cards/card-back.png" className="card" alt="card-back" />
          </li>
        </ul>
      )}
      {cards.length > 1 && (
        <ul className="list-reset display-inline">
          {cards.map((card) => {
            return (
              <li className="display-inline" key={`${card.number}_of_${card.suit}`}>
                <img src={`./cards/${card.number}_of_${card.suit}.png`} className="card" alt={`${card.number}_of_${card.suit}`} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default RenderCards;
