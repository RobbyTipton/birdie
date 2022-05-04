import React, { Component } from 'react';
import Header from './Header.js';
import Totals from './Totals.js';
import HoleContainer from './HoleContainer.js';

class Body extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Totals></Totals>
        <HoleContainer></HoleContainer>
      </div>
    );
  }
}

export default Body;
