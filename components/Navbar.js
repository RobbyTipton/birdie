import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <a className="PageLinks" href="tbd">League</a>
        <a className="PageLinks" href="tbd">Schedule</a>
        <a className="PageLinks" href="tbd">Stats</a>
        <div className="MatchLink">
        <button type="button">Scorecard</button>
        </div>
      </div>
    );
  }
}

export default Navbar;
