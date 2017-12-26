import React from 'react'

import locations from '../../util/locations'
import ToggledText from '../../components/toggled-text'

const ActiveGame = ({game, userChoices, togglePlayer, toggleLocation}) => {

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


    </div>
}


export default ActiveGame