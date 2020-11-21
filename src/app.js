import React, { Component } from 'react';
import Main from './gallery/Main';
import Header from './header'

class App extends Component {
  render() {
    return (
      <>
        <Header/>
        <Main/>
      </>
    );
  }
}

export default App;