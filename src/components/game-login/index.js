import React from 'react'
import PropTypes from 'prop-types'

import {database} from '../../util/firebase'

class GameLogin extends React.Component {
  constructor(props) {
    super(props)
    this.setListener = this.setListener.bind(this)
  }

  setListener (userId, gameId) {
    this.userStatusRef = database.ref(`/games/${gameId}/players/${userId}`)


    // from https://firebase.google.com/docs/firestore/solutions/presence#using_presence_in_realtime_database
    // Create a reference to the special ".info/connected" path in 
    // Realtime Database. This path returns `true` when connected
    // and `false` when disconnected.
    database.ref(".info/connected").on("value", (snapshot) => {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() === false) {
          return;
      }

      // If we are currently connected, then use the 'onDisconnect()' 
      // method to add a set which will only trigger once this 
      // client has disconnected by closing the app, 
      // losing internet, or any other means.
      this.userStatusRef.onDisconnect().set(null).then(() =>{
          // The promise returned from .onDisconnect().set() will
          // resolve as soon as the server acknowledges the onDisconnect() 
          // request, NOT once we've actually disconnected:
          // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

          // We can now safely set ourselves as "online" knowing that the
          // server will mark us as offline once we lose connection.
          this.userStatusRef.set(true)
      })
    })
  }

  componentWillMount() {
    const {userId, gameId} = this.props
    if (userId && gameId ) {
      this.setListener(userId, gameId)
    }
  }

  componentWillReceiveProps({userId:newId, gameId}) {
    if (newId && gameId && newId !== this.props.userId) {
      this.setListener(newId, gameId)
    }
  }

  render() { return null}
}

GameLogin.propTypes = {
  userId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired

}

export default GameLogin