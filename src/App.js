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
const userId = 'bob'

class App extends Component {
  state = {
    games: {},
    users: {}
  }
  constructor(props) {
    super(props)
    this.toggleLocation = this.toggleLocation.bind(this)
    this.togglePlayer = this.togglePlayer.bind(this)
  }

  toggleLocation(location) {
    const current = this.state.users[userId].games[gameId].locations[location]

    this.usersRef.child(`${userId}/games/${gameId}/locations`).update({
      [location]: !current
    })
  }

  togglePlayer(player) {
    const current = this.state.users[userId].games[gameId].users[player]

    this.usersRef.child(`${userId}/games/${gameId}/users`).update({
      [player]: !current
    })
  }

  componentWillMount() {
    this.gamesRef = database.ref('/games')
    this.gamesListener = this.gamesRef.on('value', snapshot=>{
      this.setState({games: snapshot.val()})
    })

    this.usersRef = database.ref('/users')
    this.usersListener = this.usersRef.on('value', snapshot=>{
      this.setState({users: snapshot.val()})
    })
  }

  componentWillUnmount() {
    this.gamesRef.off(this.gamesListener)
  }
  render() {
    const game = this.state.games[gameId]
    const user = this.state.users[userId]

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spyfall</h1>
        </header>
        {(game && user) && <Game 
          game={this.state.games[gameId]}
          user={user}
          toggleLocation={this.toggleLocation}
          togglePlayer={this.togglePlayer}
        />} 
      </div>
    );
  }
}

export default App;
