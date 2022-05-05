import React, { Component } from 'react';
import Header from './Header.js';
import Totals from './Totals.js';
import HoleContainer from './HoleContainer.js';

// fetch('api/scorecard/1')
//   .then(res => res.json())
//   .then(data => {

//   })

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: 'p1Static',
      opponentName: 'o1Static',
      date: '2022-05-05-static',
      time: '5:30-static',
      playerScore: {
        1: 'static',
        2: 'static',
        3: 'static',
        4: 'static',
        5: 'static',
        6: 'static',
        7: 'static',
        8: 'static',
        9: 'static',
      },
      opponentScore: {
        1: 'static',
        2: 'static',
        3: 'static',
        4: 'static',
        5: 'static',
        6: 'static',
        7: 'static',
        8: 'static',
        9: 'static',
      },
    };
    this.updatePlayerScore = this.updatePlayerScore.bind(this);
    this.updateOpponentScore = this.updateOpponentScore.bind(this);
  }

  componentDidMount() {
    fetch('/api/scorecard/1')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          playerName: data.playerName,
          opponentName: data.opponentName,
          date: data.date,
          time: data.time,
          playerScore: data.playerScore,
          opponentScore: data.opponentScore,
        });

        const playerHandicap = 1.11; //data.playerHandicap;
        const opponentHandicap = 3.33; //data.opponentHandicap;
        const holesByHandicap = [6, 8, 1, 9, 2, 3, 5, 4, 7];
        let playerTotalStrokes;
        let opponentTotalStrokes;
        let playerStrokes;
        let opponentStrokes;


        if (playerHandicap > opponentHandicap) {
           playerTotalStrokes = Math.floor(
            playerHandicap - opponentHandicap
          );
           opponentTotalStrokes = 0;
           playerStrokes = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
          };
          let i = playerTotalStrokes;
          let j = 0;
          while (i >= 0) {
            playerStrokes[holesByHandicap[j]] += 1;
            i--;
            j = (j + 1) % 9;
          }
        } else {
           opponentTotalStrokes = Math.floor(
            opponentHandicap - playerHandicap
          );
           playerTotalStrokes = 0;
           opponentStrokes = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
          };
          let i = opponentTotalStrokes;
          let j = 0;
          while (i >= 0) {
            opponentStrokes[holesByHandicap[j]] += 1;
            i--;
            j = (j + 1) % 9;
          }
        }
        console.log(opponentStrokes);
      })
      .catch((error) => {
        console.log('There was a problem getting scorecard data.', error);
      });
  }

  updatePlayerScore(event) {
    const data = { score: event.target.value, hole: event.target.dataset.hole };

    const playerScoreCopy = {
      ...this.state.playerScore,
    };
    playerScoreCopy[data.hole] = data.score;

    this.setState({
      playerScore: playerScoreCopy,
    });

    if (data.score !== '') {
      fetch('/api/scorecard/1/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => console.log('Success:', data))
        .catch((error) => {
          console.log('There was a problem posting scorecard data', error);
        });
    }
  }

  updateOpponentScore(event) {
    const data = { score: event.target.value, hole: event.target.dataset.hole };

    const opponentScoreCopy = {
      ...this.state.opponentScore,
    };
    opponentScoreCopy[data.hole] = data.score;

    this.setState({
      opponentScore: opponentScoreCopy,
    });

    if (data.score !== '') {
      fetch('/api/scorecard/1/opponent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => console.log('Success:', data))
        .catch((error) => {
          console.log('There was a problem posting scorecard data', error);
        });
    }
  }

  render() {
    return (
      <div>
        <Header
          playerName={this.state.playerName}
          opponentName={this.state.opponentName}
          date={this.state.date}
          time={this.state.time}
        />
        <Totals />
        <HoleContainer
          playerScore={this.state.playerScore}
          opponentScore={this.state.opponentScore}
          updatePlayerScore={this.updatePlayerScore}
          updateOpponentScore={this.updateOpponentScore}
        />
      </div>
    );
  }
}

export default Body;
