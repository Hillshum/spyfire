import React from 'react'

export default function Game ({game={}}) {
  return <div className="game-wrapper">
    {game.location}
  </div>
}


