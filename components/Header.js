import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.playerName} vs {this.props.opponentName}</h1>
        <h4>{this.props.date} | Tee Time {this.props.time}</h4>
      </div>
    );
  }
}

export default Header;
