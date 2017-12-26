import React, { Component } from 'react';

import Game from './screens/game'
import LoginScreen from './screens/login'

import {database} from './util/firebase'

import logo from './logo.svg';
import './App.css';



const userId = 'bob'

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
    this.usersRef = database.ref(`/users/${userId}`)
    this.usersListener = this.usersRef.on('value', snapshot=>{
      this.setState({user: snapshot.val()})
    })
  }

  componentWillUnmount() {
    this.usersRef.off(this.usersListener)
  }

  joinGame({name, gameId}) {
    this.setState({gameId})
  }

  render() {
    const {gameId, user} = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spyfall</h1>
        </header>
        {(gameId && user) ?
         <Game gameId={gameId} user={user}/>
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
