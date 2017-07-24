import React from 'react'
import snakecase from 'to-snake-case'
import url from 'url'
import pluralize, { singular } from 'pluralize'

import withRecords from './withRecords'
import reducer from './reducer'
import { create, all, find, updateAttributes, destroy } from './actions'

const redux = require('redux') || false

const reactiveRecord = (recordsSpec = {}) => {
  const recordsObject = {}
  recordsObject.apiPrefix = recordsSpec.apiPrefix || ''
  recordsObject.headers = recordsSpec.headers || {}
  recordsObject.credentials = recordsSpec.credentials || 'same-origin'
  recordsObject.model = modelSpec => {
    const modelObject = {}
    modelObject.singleton = modelSpec.singleton ? true : false
    modelObject.records = []
    modelObject.entities = {}
    modelObject.name = modelSpec.singleton ? singular(modelSpec.name) : pluralize(modelSpec.name)
    modelObject.actionName = modelObject.name.toUpperCase()
    modelObject.schema = modelSpec.schema
    modelObject.validations = modelSpec.validations ? modelSpec.validations : {}
    modelObject.getPrefix = _ => recordsObject.apiPrefix
    modelObject.getHeaders = _ => recordsObject.headers
    modelObject.getCredentials = _ => recordsObject.credentials
    if (redux) {
      modelObject.reducer = reducer.bind(
        null,
        state = {
          entities: modelObject.entities,
          records: modelObject.records
        },
        action,
        modelObject
      )
    }
    return {...modelSpec, ...modelObject}
  }
  return {...recordsSpec,...recordsObject}
}

export {
  reactiveRecord as default,
  withRecords,
  create, all, find, updateAttributes, destroy
}
