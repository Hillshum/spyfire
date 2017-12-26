import React from 'react'
import PropTypes from 'prop-types'

import locations from '../../util/locations'
import ToggledText from '../../components/toggled-text'

const ActiveGame = ({game, userChoices, togglePlayer, toggleLocation, endGame}) => {

    // const {gameId, user} = this.props
    // const {game} = this.state
    // const userChoices = user.games[gameId]
    return <div className="game-wrapper">
      <div className="location">Location {locations[game.location]}</div>
      {Object.keys(game.players).map(name=>(
        <ToggledText text={name} strike={userChoices.users[name]}
        onClick={()=>togglePlayer(name)} key={name}/>
      ))}

      {Object.keys(locations).map(location=>(
        <ToggledText key={location} text={locations[location]}
          onClick={()=>toggleLocation(location)}
        strike={userChoices.locations[location]}/>
      ))}

      <button onClick={endGame}>End Game</button>

    </div>
}

ActiveGame.propTypes = {
  game: PropTypes.object.isRequired,
  userChoices: PropTypes.object.isRequired,
  togglePlayer: PropTypes.func.isRequired,
  toggleLocation: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired
}


export default ActiveGame