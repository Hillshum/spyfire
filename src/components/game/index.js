import React from 'react'

import locations from '../../util/locations'
import ToggledText from '../../components/toggled-text'

export default function Game ({game={}, user, toggleLocation, togglePlayer}) {
  const userChoices = user.games.game1
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


  </div>
}


