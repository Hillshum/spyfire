import React from 'react'

export default class LoginScreen extends React.Component {
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
      <input type='text' value={gameId} placeholder='Game ID' onChange={e=>this.setState({gameId: e.currentTarget.value})} />

      <button type='button' onClick={this.onJoin}>Join Game</button>
      <button type='button' onClick={this.onCreate}>Create New Game</button>

    </div>
  }
}