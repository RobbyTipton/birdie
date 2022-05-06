import React, { Component } from 'react';

class Totals extends Component {
  render() {
    const player = {
      gross: 0,
      strokes: 0,
      points: 0,
    };

    const opponent = {
      gross: 0,
      strokes: 0,
      points: 0,
    };

    const holes = this.props.holes;
    for (const hole in holes) {
      if (holes[hole].playerScore > 0)
        player.gross += parseInt(holes[hole].playerScore);
      player.strokes += holes[hole].playerStrokes;
      if (holes[hole].opponentScore > 0)
        opponent.gross += parseInt(holes[hole].opponentScore);
      opponent.strokes += holes[hole].opponentStrokes;

      const playerNet =
        parseInt(holes[hole].playerScore) - parseInt(holes[hole].playerStrokes);
      const opponentNet =
        parseInt(holes[hole].opponentScore) -
        parseInt(holes[hole].opponentStrokes);

      if (playerNet < opponentNet) {
        player.points += 2;
      } else if (playerNet > opponentNet) {
        opponent.points += 2;
      } else {
        player.points += 1;
        opponent.points += 1;
      }
    }

    return (
      <div className="Totals">
        <h4>Player Totals</h4>
        <ul>
          <li>Gross: {player.gross}</li>
          <li>Strokes: {player.strokes}</li>
          <li>Net: {player.gross - player.strokes}</li>
          <li>Points: {player.points}</li>
        </ul>
        <h4>Opponent Totals</h4>
        <ul>
          <li>Gross: {opponent.gross}</li>
          <li>Strokes: {opponent.strokes}</li>
          <li>Net: {opponent.gross - opponent.strokes}</li>
          <li>Points: {opponent.points}</li>
        </ul>
      </div>
    );
  }
}

export default Totals;
