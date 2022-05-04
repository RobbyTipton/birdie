import React, { Component } from 'react';

class Totals extends Component {
  render() {
    return (
      <div>
        <h4>Player</h4>
        <ul>
          <li>Gross Score: 45</li>
          <li>Strokes: 5</li>
          <li>Net Score: 40</li>
          <li>Points: 8</li>
        </ul>
        <h4>Opponent</h4>
        <ul>
          <li>Gross Score: 49</li>
          <li>Strokes: 10</li>
          <li>Net Score: 39</li>
          <li>Points: 10</li>
        </ul>
      </div>
    );
  }
}

export default Totals;
