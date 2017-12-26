import React from 'react'

import {database} from '../../util/firebase'
import locations from '../../util/locations'
import ToggledText from '../../components/toggled-text'

export default class Game extends React.Component {
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
    const current = this.state.user.games[gameId].locations[location]

    this.usersRef.child(`/games/${gameId}/locations`).update({
      [location]: !current
    })
  }

  togglePlayer(player) {
    const {gameId} = this.props
    const current = this.state.user.games[gameId].users[player]

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
    const {gameId, user} = this.props
    const {game} = this.state
    if (!(game && user)) return <div>Loading</div>
    const userChoices = user.games[gameId]
    return <div className="game-wrapper">
      <div className="location">Location {locations[game.location]}</div>
      {Object.keys(game.players).map(name=>(
        <ToggledText text={name} strike={userChoices.users[name]}
        onClick={()=>this.togglePlayer(name)} key={name}/>
      ))}

      {Object.keys(locations).map(location=>(
        <ToggledText key={location} text={locations[location]}
          onClick={()=>this.toggleLocation(location)}
        strike={userChoices.locations[location]}/>
      ))}


    </div>
  }
}