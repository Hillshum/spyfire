import React, { Component } from 'react';

import {auth, database} from './util/firebase'

import GameScreen from './screens/game'
import LoginScreen from './screens/login'

import logo from './logo.svg';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameId: null,
      user: {}
    }
    this.joinGame = this.joinGame.bind(this)
  }

  componentWillMount() {
    auth.signInAnonymously()
    this.authListener = auth.onAuthStateChanged(user=>{
      this.setState({user: user || {}})
    })
  }

  saveName(userId, name) {
    database.ref(`/users/names/${userId}`).set(name)
  }

  joinGame({name, gameId}) {
    this.saveName(name, this.state.user.uid)
    this.setState({gameId})
  }

  render() {
    const {gameId, user:{uid: userId} = {}} = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spyfall</h1>
        </header>
        {(gameId && userId) ?
         <GameScreen gameId={gameId} userId={userId}/>
         : <LoginScreen 
            onJoin={this.joinGame}
            onCreate={this.createGame}
          />
        } 

      </div>
    );
  }
}

export default App;
