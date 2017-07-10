import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

function createRecordKeeper() {
  class RecordKeeper extends Component {
    constructor(props) {
      super(props)
      this.recordObject = props.base
    }
    render () {
      return Children.only(this.props.children)
    }
  }
  RecordKeeper.propTypes = {
    base: PropTypes.object.isRequired,
    models: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  return RecordKeeper
}

export default createRecordKeeper()
