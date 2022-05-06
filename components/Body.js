import React, { Component } from 'react';
import Header from './Header.js';
import Totals from './Totals.js';
import HoleContainer from './HoleContainer.js';
import matchHandicaps from './functions/match-hadicaps.js';
import createDefaultHoles from './functions/create-default-holes.js';
import determineDataConsistency from './functions/determine-data-consistency.js';

const playerId = 1;

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: 'p1Static',
      opponentName: 'o1Static',
      date: '2022-05-05-static',
      time: '5:30-static',
      holes: createDefaultHoles(),
    };
    this.updatePlayerScore = this.updatePlayerScore.bind(this);
    this.updateOpponentScore = this.updateOpponentScore.bind(this);
  }

  /* 
  Mounting: Get player's scorecard data from database and use it to update state.
  */
  componentDidMount() {
    fetch(`/api/scorecard/${playerId}`)
      .then((res) => res.json())
      .then((data) => {
        const { playerStrokes, opponentStrokes } = matchHandicaps();

        const holesCopy = {
          ...this.state.holes,
        };
        for (let i = 1; i <= 9; i++) {
          holesCopy[i] = {
            ...this.state.holes[i],
            playerScore: data.playerScore[i],
            opponentScore: data.opponentScore[i],
            playerStrokes: playerStrokes[i],
            opponentStrokes: opponentStrokes[i],
          };
        }

        this.setState({
          playerName: data.playerName,
          opponentName: data.opponentName,
          date: data.date,
          time: data.time,
          holes: holesCopy,
        });
      })
      .catch((error) => {
        console.log('There was a problem getting scorecard data.', error);
      });
  }

  /* 
  Updating: Get opponent's scorecard data from database, compare it to state, and update state accordingly.
  */
  // componentDidUpdate() {

  // }

  updatePlayerScore(event) {
    const eventData = {
      score: event.target.value,
      hole: event.target.dataset.hole,
    };

    const holesCopy = {
      ...this.state.holes,
    };

    if (eventData.score !== '') {
      holesCopy[eventData.hole] = {
        ...this.state.holes[eventData.hole],
        playerScore: parseInt(eventData.score),
      };
    } else {
      holesCopy[eventData.hole] = {
        ...this.state.holes[eventData.hole],
        playerScore: '',
      };
    }

    this.setState({
      holes: holesCopy,
    });

    if (eventData.score !== '') {
      fetch(`/api/scorecard/${playerId}/player`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
        .then((res) => res.json())
        .then((data) => console.log('Success:', data))
        .catch((error) => {
          console.log('There was a problem posting scorecard data', error);
        });

      fetch(`/api/scorecard/${playerId}/opponent`)
        .then((res) => res.json())
        .then((data) => {
          const { playerScoreFromOpponent } = data;
          const holesCopy = {
            ...this.state.holes,
          };
          holesCopy[eventData.hole] = {
            ...this.state.holes[eventData.hole],
            statusPlayer: determineDataConsistency(
              this.state.holes[eventData.hole].playerScore,
              playerScoreFromOpponent[eventData.hole]
            ),
          };
          this.setState({
            holes: holesCopy,
          });
        })
        .catch((error) => {
          console.log(
            "There was a problem getting opponent's scorecard data.",
            error
          );
        });
    }
  }

  updateOpponentScore(event) {
    const eventData = {
      score: event.target.value,
      hole: event.target.dataset.hole,
    };

    const holesCopy = {
      ...this.state.holes,
    };

    if (eventData.score !== '') {
      holesCopy[eventData.hole] = {
        ...this.state.holes[eventData.hole],
        opponentScore: parseInt(eventData.score),
      };
    } else {
      holesCopy[eventData.hole] = {
        ...this.state.holes[eventData.hole],
        opponentScore: '',
      };
    }

    this.setState({
      holes: holesCopy,
    });

    if (eventData.score !== '') {
      fetch(`/api/scorecard/${playerId}/opponent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
        .then((res) => res.json())
        .then((data) => console.log('Success:', data))
        .catch((error) => {
          console.log('There was a problem posting scorecard data', error);
        });

      fetch(`/api/scorecard/${playerId}/opponent`)
        .then((res) => res.json())
        .then((data) => {
          const { opponentScoreFromOpponent } = data;
          const holesCopy = {
            ...this.state.holes,
          };
          holesCopy[eventData.hole] = {
            ...this.state.holes[eventData.hole],
            statusOpponent: determineDataConsistency(
              this.state.holes[eventData.hole].opponentScore,
              opponentScoreFromOpponent[eventData.hole]
            ),
          };
          this.setState({
            holes: holesCopy,
          });
        })
        .catch((error) => {
          console.log(
            "There was a problem getting opponent's scorecard data.",
            error
          );
        });
    }
  }

  render() {
    return (
      <div className="BodyContainer">
        <Header
          playerName={this.state.playerName}
          opponentName={this.state.opponentName}
          date={this.state.date}
          time={this.state.time}
        />
        <Totals holes={this.state.holes} />
        <HoleContainer
          holes={this.state.holes}
          updatePlayerScore={this.updatePlayerScore}
          updateOpponentScore={this.updateOpponentScore}
        />
      </div>
    );
  }
}

export default Body;
