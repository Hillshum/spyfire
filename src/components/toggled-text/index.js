import React from 'react'

import './styles.css'

export default class ToggledText extends React.Component{

  render() {
    const {text='', strike=false} = this.props
    return <div className={"toggled-text " + (strike ? "strike" : '')}>
      {text}
    </div>
  }
}