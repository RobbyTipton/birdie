import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Body from './Body.js';

class App extends Component {
  render() {
    return (
      <div>
        {/* <h1>Hello World, from App.js!</h1> */}
        <Navbar></Navbar>
        <Body></Body>
      </div>
    );
  }
}

export default App;
