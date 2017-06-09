import React, { Component, createElement } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import camelcase from 'camelcase'
import pluralize from 'pluralize'
import { all } from './actions'

const withRecords = models => BaseComponent => {
  const mapStateToProps = state => models.reduce((prev, model) => ({
    ...prev,
    [camelcase(model.name)]: state[model.name]
  }), {})
  const mapDispatchToProps = dispatch => models.reduce((prev, model) => ({
    [`${camelcase(pluralize.singular(model.name))}_actions`]: {
      all, find, create, updateAttributes, destroy
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
