import React, { Component } from 'react';

class HoleContainer extends Component {
  render() {
    const holes = [];
    for (let i = 1; i <= 9; i++) {
      const playerGross = this.props.holes[i].playerScore;
      const opponentGross = this.props.holes[i].opponentScore;
      const playerStrokes = this.props.holes[i].playerStrokes;
      const opponentStrokes = this.props.holes[i].opponentStrokes;
      const playerNet = playerGross - playerStrokes;
      const opponentNet = opponentGross - opponentStrokes;
      const playerPoints = null;
      const opponentPoints = null;

      if (playerNet < opponentNet) {
        playerPoints = 2;
        opponentPoints = 0;
      } else if (playerNet > opponentNet) {
        playerPoints = 0;
        opponentPoints = 2;
      } else {
        playerPoints = 1;
        opponentPoints = 1;
      }

      holes.push(
        <div key={i} className="Hole">
          <h2>Hole {i}</h2>
          <h4>Player</h4>
          <form>
            <label>
              Gross:
              <input
                type="text"
                value={playerGross}
                onChange={this.props.updatePlayerScore}
                data-hole={i}
              />
            </label>
          </form>
          <ul>
            <li>Strokes: {playerStrokes}</li>
            <li>Net: {playerNet}</li>
            <li>Points: {playerPoints}</li>
            <li>Status: {this.props.holes[i].statusPlayer}</li>
          </ul>
          <h4>Opponent</h4>
          <form>
            <label>
              Gross:
              <input
                type="text"
                value={opponentGross}
                onChange={this.props.updateOpponentScore}
                data-hole={i}
              />
            </label>
          </form>
          <ul>
            <li>Strokes: {opponentStrokes}</li>
            <li>Net: {opponentNet}</li>
            <li>Points: {opponentPoints}</li>
            <li>Status: {this.props.holes[i].statusOpponent}</li>
          </ul>
        </div>
      );
    }
    return <div className="HoleContainer">{holes}</div>;
  }
}

export default HoleContainer;
