import snakecase from 'to-snake-case'
import url from 'url'
import pluralize from 'pluralize'
// import { deepPrune } from './prune'

const fakeDispatch = obj => {}

export async function all (model) {
  const prefix = model.getPrefix()
  const headers = model.getHeaders()
  const credentials = model.getCredentials()
  const route = url.format({
    pathname: `${prefix}/${snakecase(pluralize(model.name))}`
  })
  try {
    const response = await fetch(route, { method: 'GET', headers, credentials })
    const body =  await response.json()
    return await body.map(item => Object.keys(model.schema).reduce((prev, curr) => {
      if (item[curr]) {
        return {
          ...prev,
          [curr]: item[curr]
        }
      } else return prev
    }, {}))
  } catch (err) {
    console.error(err.message)
  }
}

async function find (model, id) {
  const prefix = model.getPrefix
  const headers = model.getHeaders
  const credentials = model.getCredentials
  const route = url.format({
    pathname: `${prefix}/${snakecase(model.name)}/${id}`
  })
  const response = await fetch(route, { method: 'GET', headers, credentials })
  const body = await response.json()
  return await Object.keys(model).reduce
}
