function ListOfRules() {
  return (
    <ul className="list-reset">
      <li>
        It's you versus the casino of Boolean
      </li>
      <li>
        The goal of blackjack is to beat the dealer's hand without going over 21.
      </li>
      <li>
        Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.
      </li>
      <li>
        Each player starts with two cards, one of the dealer's cards is hidden until the end.
      </li>
      <li>
        To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.
      </li>
      <li>
        If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.
      </li>
      <li>
        If you are dealt 21 from the start (Ace & 10), you got a blackjack.
      </li>
      <li>
        If your first 2 cards add up to between 9-11 inclusive, you may double your bet. Aces always count as 11 in this case.
      </li>
      <li>
        Doubling means that you can only draw one more card.
      </li>
      <li>
        At the Boolean Casino, we don't offer a split as it would be very tedious to code.
      </li>
    </ul>
  );
}

export default ListOfRules;
