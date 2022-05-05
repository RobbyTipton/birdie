import React, { Component } from 'react';

class HoleContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     playerScore: {
  //       1: 'static',
  //       2: 'static',
  //       3: 'static',
  //       4: 'static',
  //       5: 'static',
  //       6: 'static',
  //       7: 'static',
  //       8: 'static',
  //       9: 'static',
  //     },
  //     opponentScore: {
  //       1: 'static',
  //       2: 'static',
  //       3: 'static',
  //       4: 'static',
  //       5: 'static',
  //       6: 'static',
  //       7: 'static',
  //       8: 'static',
  //       9: 'static',
  //     },
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  // }

  // handleChange(event) {
  //   this.setState({
  //     playerScore: {
  //       ...this.state.playerScore,
  //       1: event.target.value,
  //     },
  //   });
  //   console.log(event.target.value);
  //   const data = { score: event.target.value };
  //   fetch('/api/scorecard/1', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log('Success:', data))
  //     .catch((error) => {
  //       console.log('There was a problem posting scorecard data', error);
  //     });
  // }

  render() {
    const holes = [];
    for (let i = 1; i <= 9; i++) {
      holes.push(
        <div key={i}>
          <h2>Hole {i}</h2>
          <h4>Player</h4>
          <form>
            <label>
              Gross Score:
              <input
                type="text"
                value={this.props.playerScore[i]}
                onChange={this.props.updatePlayerScore}
                data-hole={i}
              />
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
              <input
                type="text"
                value={this.props.opponentScore[i]}
                onChange={this.props.updateOpponentScore}
                data-hole={i}
              />
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
