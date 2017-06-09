import React, { Component } from 'react'
import snakecase from 'to-snake-case'
import url from 'url'
import pluralize from 'pluralize'

import withRecords from './withRecords'
import { all } from './actions'
import reducer from './reducer'

const reactiveRecord = spec => {
  const that = {}
  that.apiPrefix = spec.apiPrefix || ''
  that.headers = spec.headers || {}
  that.credentials = spec.credentials || 'same-origin'
  that.model = modelSpec => {
    const modelObject = {}
    modelObject.singleton = modelSpec.singleton ? true : false
    modelObject.records = []
    modelObject.entities = {}
    modelObject.name = modelSpec.singleton ? pluralize.singular(modelSpec.name) : pluralize(modelSpec.name)
    modelObject.schema = modelSpec.schema
    modelObject.validations = modelSpec.validations ? modelSpec.validations : {}
    modelObject.getPrefix = _ => _that.apiPrefix
    modelObject.getHeaders = _ => _that.headers
    modelObject.getCredentials = _ => _that.credentials
    return modelObject
  }
  return that
}

export {
  reactiveRecord as default,
  all,
  reducer,
  withRecords,
}
