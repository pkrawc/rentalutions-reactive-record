import React, { Component } from 'react'
import snakecase from 'to-snake-case'
import url from 'url'
import pluralize from 'pluralize'

import withRecords from './withRecords'
import { all } from './actions'
import reducer from './reducer'

function reactiveRecord(obj) {
  const _that = this
  this.apiPrefix = obj.apiPrefix || ''
  this.headers = obj.headers || {}
  this.credentials = obj.credentials || 'same-origin'
  this.model = function (modelConfig) {
    this.singleton = modelConfig.singleton ? true : false
    this.records = []
    this.entities = {}
    this.name = this.singleton ? pluralize.singular(modelConfig.name) : pluralize(modelConfig.name)
    this.schema = modelConfig.schema
    this.validations = modelConfig.validations ? modelConfig.validations : {}
    this.getPrefix = _ => _that.apiPrefix
    this.getHeaders = _ => _that.headers
    this.getCredentials = _ => _that.credentials
  }
}

export {
  reactiveRecord as default,
  all,
  reducer,
  withRecords,
}
