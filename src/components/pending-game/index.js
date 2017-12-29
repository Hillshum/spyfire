import React from 'react'
import PropTypes from 'prop-types'

const PendingGame = ({game, playerNames, onStart}) => {
  return <div className='pending-game'>
    <h4>Ready to play</h4>
    <ul className='ready-players'>
      {Object.keys(game.players).map(user=>(
        <li key={user}>{playerNames[user]}</li>
      ))}
    </ul>
    <button className="btn" onClick={onStart}>Start Game</button>
  </div>
}

PendingGame.propTypes = {
  game: PropTypes.object.isRequired,
  onStart: PropTypes.func.isRequired,
  playerNames: PropTypes.object.isRequired
}

export default PendingGame