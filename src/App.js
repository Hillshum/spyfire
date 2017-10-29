import React, { Component } from 'react';
import firebase from 'firebase'

import Game from './components/game'

import logo from './logo.svg';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyD0DH7UPPGYJuuSNoLZmVnfpYnSbCwB_r0",
  authDomain: "spyfall-127c6.firebaseapp.com",
  databaseURL: "https://spyfall-127c6.firebaseio.com",
  projectId: "spyfall-127c6",
  storageBucket: "spyfall-127c6.appspot.com",
  messagingSenderId: "707568045960"
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()


const gameId = 'game1'

class App extends Component {
  state = {
    games: {}
  }

  componentWillMount() {
    this.gamesRef = database.ref('/games')
    this.gamesListener = this.gamesRef.on('value', snapshot=>{
      this.setState({games: snapshot.val()})
    })
  }

  componentWillUnmount() {
    this.gamesRef.off(this.gamesListener)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Game game={this.state.games[gameId]} />
      </div>
    );
  }
}

export default App;
