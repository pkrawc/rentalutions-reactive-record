import React, { Component, createElement } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import camelcase from 'camelcase'
import pluralize from 'pluralize'
import { all } from './actions'

const withRecords = models => BaseComponent => {
  console.log(models)
  const mapStateToProps = state => models.reduce((prev, model) => {
    console.log(model, prev)
    return {
      ...prev,
      [camelcase(model.name)]: state[model.name]
    }
  }, {})
  const mapDispatchToProps = dispatch => models.reduce((prev, model) => ({
    [`${camelcase(pluralize.singular(model.name))}_actions`]: {
      // put all actions here to receive dispatch
      all: _ => all(model)
    }
  }), {})
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(class WrappedComponent extends Component {
    render() {
      const { children, ...rest } = this.props
      return createElement(BaseComponent, rest, children)
    }
  })
}

export default withRecords
