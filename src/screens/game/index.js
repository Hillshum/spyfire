import React from 'react'

import {database} from '../../util/firebase'
import pickRandom from '../../util/pickRandom'

import ActiveGame from '../../components/active-game'
import PendingGame from '../../components/pending-game'

export default class GameScreen extends React.Component {
  state = {
    game: null,
    user: null
  }
  constructor(props) {
    super(props)
    this.toggleLocation = this.toggleLocation.bind(this)
    this.togglePlayer = this.togglePlayer.bind(this)
    this.startGame = this.startGame.bind(this)
    this.clearUserChoices = this.clearUserChoices.bind(this)
  }

  startGame() {
    
    const {players} = this.state.game
    const {spy, location} = pickRandom(Object.keys(players))

    const newPlayers = Object.keys(players).reduce((prev, curr)=>(
      {...prev, [curr]: curr === spy} // all players are false except spy
    ), {}) 
    this.gameRef.update({location, players: newPlayers})
  }

  toggleLocation(location) {
    const {gameId} = this.props
    const {user} = this.state
    const current = user.games[gameId].locations[location]

    this.usersRef.child(`/games/${gameId}/locations`).update({
      [location]: !current
    })
  }

  togglePlayer(player) {
    const {gameId} = this.props
    const {user} = this.state
    const current = user.games[gameId].players[player]

    this.usersRef.child(`/games/${gameId}/users`).update({
      [player]: !current
    })
  }

  clearUserChoices() {
    this.usersRef.child(this.props.gameId).update({})
  }

  componentWillMount() {
    const gameId = this.props.gameId
    this.gameRef = database.ref(`/games/${gameId}`)
    this.gamesListener = this.gameRef.on('value', snapshot=>{
      this.setState({game: snapshot.val()})
    })

    this.usersRef = database.ref(`/users/${this.props.userId}`)
    this.usersListener = this.usersRef.on('value', snapshot=>{
      const newUser = snapshot.val()
      newUser.games = newUser.games || {}
      newUser.games[gameId] = newUser.games[gameId] || {}
      newUser.games[gameId].locations = newUser.games[gameId].locations || {}
      newUser.games[gameId].players = newUser.games[gameId].players || {}
      this.setState({user: newUser})
    })
  }

  componentWillUnmount() {
    this.gameRef.off(this.gamesListener)
  }
  render () {
    const {gameId} = this.props
    const {game, user} = this.state
    if (!game || !user) return <div>Loading</div>
    const userGames = user.games || {}
    const userChoices = userGames[gameId] || {}
    if (game.location) {
      return <ActiveGame
        userChoices={userChoices}
        game={game}
        toggleLocation={this.toggleLocation}
        togglePlayer={this.togglePlayer }
        endGame={()=>this.gameRef.update({location: null})}
      />
    } else {
      return <PendingGame game={game} onStart={this.startGame} />
    }
  }
}