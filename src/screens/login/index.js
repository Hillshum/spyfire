import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/button'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      gameId: ''
    }
    this.onJoin = this.onJoin.bind(this)
    this.onCreate = this.onCreate.bind(this)
  }

  onJoin () {
    this.props.onJoin({...this.state})
  }

  onCreate () {
    this.props.onCreate({name: this.state.name})
  }

  render() {
    const {name, gameId} = this.state
    return <div className="login-screen">
      <input type='text' value={name} placeholder='Name' onChange={e=>this.setState({name: e.currentTarget.value})} />
      <input type='text' value={gameId} placeholder='Game ID' onChange={e=>this.setState({gameId: e.currentTarget.value.toLocaleLowerCase()})} />

      <button className="btn" type='button' onClick={this.onJoin}>Join Game</button>
      <Button className="btn" type='button' onClick={this.onCreate}>Create New Game</Button>

    </div>
  }
}

LoginScreen.propTypes = {
  onJoin: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default LoginScreen
