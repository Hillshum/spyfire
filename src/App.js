import React, { Component } from 'react';

import Game from './components/game'

import logo from './logo.svg';
import './App.css';



const gameId = 'game1'
const userId = 'bob'

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spyfall</h1>
        </header>
        {(gameId && userId) && <Game gameId={gameId} userId={userId}/>} 
      </div>
    );
  }
}

export default App;
