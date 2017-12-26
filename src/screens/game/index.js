import React from 'react'

import {database} from '../../util/firebase'

import ActiveGame from '../../components/active-game'

export default class GameScreen extends React.Component {
  state = {
    game: null,
    user: null
  }
  constructor(props) {
    super(props)
    this.toggleLocation = this.toggleLocation.bind(this)
    this.togglePlayer = this.togglePlayer.bind(this)
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
    const current = user.games[gameId].users[player]

    this.usersRef.child(`/games/${gameId}/users`).update({
      [player]: !current
    })
  }

  componentWillMount() {
    this.gamesRef = database.ref(`/games/${this.props.gameId}`)
    this.gamesListener = this.gamesRef.on('value', snapshot=>{
      this.setState({game: snapshot.val()})
    })

    this.usersRef = database.ref(`/users/${this.props.userId}`)
    this.usersListener = this.usersRef.on('value', snapshot=>{
      this.setState({user: snapshot.val()})
    })
  }

  componentWillUnmount() {
    this.gamesRef.off(this.gamesListener)
  }
  render () {
    const {gameId} = this.props
    const {game, user} = this.state
    if (!(game && user)) return <div>Loading</div>
    const userChoices = user.games[gameId]
    return <ActiveGame
      userChoices={userChoices}
      game={game}
      toggleLocation={this.toggleLocation}
      togglePlayer={this.togglePlayer }
    />
  }
}