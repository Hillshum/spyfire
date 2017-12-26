import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

class ToggledText extends React.Component{

  render() {
    const {text='', strike=false, onClick} = this.props
    return <div onClick={onClick} className={"toggled-text " + (strike ? "strike" : '')}>
      {text}
    </div>
  }
}

ToggledText.propTypes = {
  text: PropTypes.string.isRequired,
  strike: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}


export default ToggledText