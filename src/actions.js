import snakecase from 'to-snake-case'
import url from 'url'
import pluralize from 'pluralize'
import pick from 'lodash/pick'

const fakeDispatch = obj => obj

export function create (model) {
  const prefix = model.getPrefix()
  const headers = model.getHeaders()
  const credentials = model.getCredentials()
  const route = url.format({
    hostname: window.location.hostname,
    port: location.port,
    pathname: `/${prefix}/${snakecase(pluralize(model.name))}`
  })
  return async (dispatch = fakeDispatch) => {
    dispatch({type: `CREATING_${model.actionName}`})
    try {
      const request = await fetch(route, {method: 'GET', headers, credentials})
      const json = await request.json()
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
  return [{}]
}

export function find (model, ...ids) {
  return [{}]
}

export function updateAttributes (model, id, attrs) {
  return {}
}

export function delete (model, id) {
  return id
}
