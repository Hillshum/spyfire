import locations from './locations'

const locationKeys = Object.keys(locations)

export default function pickRandom (players) {

  return {
    location: locationKeys[Math.floor(Math.random() * locationKeys.length)],
    spy: players[Math.floor(Math.random() * players.length)]
  }
}