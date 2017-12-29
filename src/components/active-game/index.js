import React from 'react'
import PropTypes from 'prop-types'

import locations from '../../util/locations'
import ToggledText from '../../components/toggled-text'

const ActiveGame = ({game, userId, userChoices, playerNames, togglePlayer, toggleLocation, endGame}) => {

  return <div className="game-wrapper">
    {game.spy === userId ?
      <div className='spy'>You are the spy!</div>
      : <div className="location">You are not the spy. Location {locations[game.location]}</div>
    }
    {Object.keys(game.players).map(name=>(
      <ToggledText text={playerNames[name]} strike={userChoices.players[name]}
      onClick={()=>togglePlayer(name)} key={name}/>
    ))}

    {Object.keys(locations).map(location=>(
      <ToggledText key={location} text={locations[location]}
        onClick={()=>toggleLocation(location)}
      strike={userChoices.locations[location]}/>
    ))}

    <button className="btn" onClick={endGame}>End Game</button>

  </div>
}

ActiveGame.propTypes = {
  game: PropTypes.object.isRequired,
  userChoices: PropTypes.object.isRequired,
  togglePlayer: PropTypes.func.isRequired,
  toggleLocation: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}


export default ActiveGame