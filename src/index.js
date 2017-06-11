import React, { Component } from 'react'
import snakecase from 'to-snake-case'
import url from 'url'
import pluralize from 'pluralize'

import withRecords from './withRecords'
import { all } from './actions'
import reducer from './reducer'

const reactiveRecord = recordsSpec => {
  const recordsObject = {}
  recordsObject.apiPrefix = recordsSpec.apiPrefix || ''
  recordsObject.headers = recordsSpec.headers || {}
  recordsObject.credentials = recordsSpec.credentials || 'same-origin'
  recordsObject.model = modelSpec => {
    const modelObject = {}
    modelObject.singleton = modelSpec.singleton ? true : false
    modelObject.records = []
    modelObject.entities = {}
    modelObject.name = modelSpec.singleton ? pluralize.singular(modelSpec.name) : pluralize(modelSpec.name)
    modelObject.schema = modelSpec.schema
    modelObject.validations = modelSpec.validations ? modelSpec.validations : {}
    modelObject.getPrefix = _ => recordsObject.apiPrefix
    modelObject.getHeaders = _ => recordsObject.headers
    modelObject.getCredentials = _ => recordsObject.credentials
    return {...modelSpec, ...modelObject}
  }
  return {...recordsSpec,...recordsObject}
}

export {
  reactiveRecord as default,
  all,
  reducer,
  withRecords,
}
