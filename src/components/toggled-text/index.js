import React from 'react'

import './styles.css'

export default class ToggledText extends React.Component{

  render() {
    const {text='', strike=false, onClick} = this.props
    return <div onClick={onClick} className={"toggled-text " + (strike ? "strike" : '')}>
      {text}
    </div>
  }
}