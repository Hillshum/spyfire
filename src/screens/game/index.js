import React from 'react'
import PropTypes from 'prop-types'

import {database} from '../../util/firebase'
import pickRandom from '../../util/pickRandom'
import NameQuery from '../../util/name-query'

import ActiveGame from '../../components/active-game'
import GameLogin from '../../components/game-login'
import PendingGame from '../../components/pending-game'
import { Object } from 'es6-shim';

class GameScreen extends React.Component {
  state = {
    game: null,
    user: null,
    playerNames: {}
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
    this.gameRef.update(pickRandom(Object.keys(players)))
  }

  toggleLocation(location) {
    const {user} = this.state
    const current = user.locations[location]

    this.userGameRef.child(`/locations`).update({
      [location]: !current
    })
  }

  togglePlayer(player) {
    const {user} = this.state
    const current = user.players[player]

    this.userGameRef.child(`/players`).update({
      [player]: !current
    })
  }

  clearUserChoices() {
    this.userGameRef.remove()
  }

  componentWillMount() {
    const gameId = this.props.gameId
    this.gameRef = database.ref(`/games/${gameId}`)
    this.nameQuery = new NameQuery()
    this.gamesListener = this.gameRef.on('value', snapshot=>{
      const newGame = snapshot.val() || {}
      const oldGame = this.state.game
      if (oldGame && newGame.location !== oldGame.location) {
        this.clearUserChoices()
      }

      newGame.players = newGame.players || {}

      this.nameQuery.listen(Object.keys(newGame.players), players=>{
        this.setState({playerNames: players})
      })

      this.setState({game: newGame})
    })

    this.userGameRef = database.ref(`/users/games/${this.props.userId}/${gameId}`)
    this.userGameListener = this.userGameRef.on('value', snapshot=>{
      const newUser = snapshot.val() || {}
      newUser.locations = newUser.locations || {}
      newUser.players = newUser.players || {}
      this.setState({user: newUser})
    })

  }

  componentWillUnmount() {
    this.gameRef.off(this.gamesListener)
    this.userGameRef.off(this.userGameListener)
    this.nameQuery.stop()
  }
  render () {
    const {userId, gameId} = this.props
    const {game, user, playerNames} = this.state
    return <div className='game-screen'>
      <GameLogin userId={userId} gameId={gameId} />
      {(!game || !user) ? <div>Loading</div> : 
      (game.location ? 
        <ActiveGame
          userChoices={user}
          game={game}
          userId={userId}
          playerNames={playerNames}
          toggleLocation={this.toggleLocation}
          togglePlayer={this.togglePlayer }
          endGame={()=>this.gameRef.update({location: null})}
        /> : 
          <PendingGame playerNames={playerNames} game={game} onStart={this.startGame} />
      )}
    </div>
  }
}

GameScreen.propTypes = {
  gameId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

export default GameScreen