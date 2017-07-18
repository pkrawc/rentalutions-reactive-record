import snakecase from 'to-snake-case'
import url from 'url'
import { singular } from 'pluralize'
import pick from 'lodash/pick'

const fakeDispatch = obj => obj

export function create (model, obj) {
  const prefix = model.getPrefix()
  const headers = model.getHeaders()
  const credentials = model.getCredentials()
  const route = url.format({
    hostname: window.location.hostname,
    port: location.port,
    pathname: `/${prefix}/${snakecase(model.name)}`
  })
  return async (dispatch = fakeDispatch) => {
    dispatch({type: `CREATING_${model.actionName}_RECORD`})
    try {
      const response = await fetch(route, {method: 'POST', body: obj, headers, credentials})
      const json = await response.json()
      const responseBody = pick(json.body, Object.keys(model.schema))
      dispatch({type: `CREATED_${model.actionName}`, payload: responseBody})
      return responseBody
    } catch (err) {
      dispatch({type: 'ERROR', payload: err})
      return err
    }
  }
}

export function all (model) {
  const prefix = model.getPrefix()
  const headers = model.getHeaders()
  const credentials = model.getCredentials()
  const route = url.format({
    hostname: window.location.hostname,
    port: location.port,
    pathname: `/${prefix}/${snakecase(model.name)}`
  })
  return async (dispatch = fakeDispatch) => {
    dispatch({type: `FETCHING_ALL_${model.actionName}`})
    try {
      const response = await fetch(route, {method: 'GET', headers, credentials})
      const json = await response.json()
      const responseBody = response.body.map(obj => pick(obj, Object.keys(model.schema)))
      dispatch({type: `FETCHED_ALL_${model.actionName}`, payload: responseBody})
      return responseBody
    } catch (err) {
      dispatch({type: `ERROR`, payload: err})
      return err
    }
  }
}

export function find (model, id) {
  const prefix = model.getPrefix()
  const headers = model.getHeaders()
  const credentials = model.getCredentials()
  const route = url.format({
    hostname: window.location.hostname,
    port: location.port,
    pathname: `/${prefix}/${snakecase(model.name)}/${id}`
  })
  return async (dispatch = fakeDispatch) => {
    dispatch({type: `FETCHING_ONE_${model.actionName}`})
    try {
      const response = await fetch(route, {method: 'GET', headers, credentials})
      const json = await response.json()
      const responseBody = pick(json.body, Object.keys(model.schema))
      dispatch({type: `FETCHED_ONE_${model.actionName}`, payload: responseBody})
      return responseBody
    } catch (err) {
      dispatch({type: 'ERROR', payload: err})
      return err
    }
  }
}

export function updateAttributes (model, id, attrs) {
  const prefix = model.getPrefix()
  const headers = model.getHeaders()
  const credentials = model.getCredentials()
  const route = url.format({
    hostname: window.location.hostname,
    port: location.port,
    pathname: `/${prefix}/${snakecase(model.name)}/${id}`
  })
  return async (dispatch = fakeDispatch) => {
    dispatch({type: `UPDATING_${model.actionName}_ATTRIBUTES`})
    try {
      const response = await fetch(route, {method: 'PUT', body: attrs, headers, credentials})
      const json = await response.json()
      const responseBody = pick(json.body, Object.keys(model.schema))
      dispatch({type: `UPDATED_${model.actionName}_ATTRIBUTES`, payload: responseBody})
      return responseBody
    } catch (err) {
      dispatch({type: 'ERROR', payload: err})
      return err
    }
  }
}

export function destroy (model, id) {
  const prefix = model.getPrefix()
  const headers = model.getHeaders()
  const credentials = model.getCredentials()
  const route = url.format({
    hostname: window.location.hostname,
    port: location.port,
    pathname: `/${prefix}/${snakecase(model.name)}/${id}`
  })
  return async (dispatch = fakeDispatch) => {
    dispatch({type: `DESTROYING_${model.actionName}_RECORD`})
    try {
      const response = await fetch(route, {method: 'DELETE', headers, credentials})
      const json = await response.json()
      const responseBody = pick(json.body, Object.keys(model.schema))
      dispatch({type: `DESTROYED_${model.actionName}_RECORD`, payload: responseBody})
      return responseBody
    } catch (err) {
      dispatch({type: 'ERROR', payload: err})
      return err
    }
  }
}
