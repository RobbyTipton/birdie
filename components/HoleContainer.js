import React, { Component } from 'react';

class HoleContainer extends Component {
  render() {
    const holes = [];
    for (let i = 1; i <= 9; i++) {
      holes.push(
        <div>
          <h2>Hole {i}</h2>
          <h4>Player</h4>
          <form>
            <label>
              Gross Score:
              <input type="text" />
            </label>
          </form>
          <ul>
            <li>Strokes: 0</li>
            <li>Net Score: 5</li>
            <li>Points: 0</li>
          </ul>
          <h4>Opponent</h4>
          <form>
            <label>
              Gross Score:
              <input type="text" />
            </label>
          </form>
          <ul>
            <li>Strokes: 1</li>
            <li>Net Score: 4</li>
            <li>Points: 2</li>
          </ul>
        </div>
      );
    }
    return <div>{holes}</div>;
  }
}

export default HoleContainer;
