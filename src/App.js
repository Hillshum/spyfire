import React, { Component } from 'react';

import {auth, database} from './util/firebase'

import GameScreen from './screens/game'
import LoginScreen from './screens/login'

import logo from './logo.svg';
import './App.css';


const ID_CHARS = 'abcdefghijklmnopqrstuvwxyz'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameId: null,
      user: {}
    }
    this.joinGame = this.joinGame.bind(this)
    this.createGame = this.createGame.bind(this)
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
    this.saveName(this.state.user.uid, name)
    this.setState({gameId})
  }

  createGame({name}) {
    this.saveName(this.state.user.uid, name)
    const gameId = 'xxxxxx'.replace(x=>{
      return ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)]
    })
    console.log(gameId)
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
