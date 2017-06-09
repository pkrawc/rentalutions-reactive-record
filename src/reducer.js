
const reducer = model => (state = {
  records: model.records,
  entities: model.entities
}, action) => {
  switch (action.type) {

    case 'ALL_ATTEMPT':
      return state
    break
    case 'ALL_SUCCESS':
      return state
    break
    case 'ALL_FAIL':
      return state
    break

    case 'FIND_ATTEMPT':
      return state
    break
    case 'FIND_SUCCESS':
      return state
    break
    case 'FIND_FAIL':
      return state
    break

    case 'UPDATE_ATTRIBUTES_ATTEMPT':
      return state
    break
    case 'UPDATE_ATTRIBUTES_SUCCESS':
      return state
    break
    case 'UPDATE_ATTRIBUTES_FAIL':
      return state
    break

    case 'CREATE_ATTEMPT':
      return state
    break
    case 'CREATE_SUCCESS':
      return state
    break
    case 'CREATE_FAIL':
      return state
    break

    case 'DESTROY_ATTEMPT':
      return state
    break
    case 'DESTROY_SUCCESS':
      return state
    break
    case 'DESTROY_FAIL':
      return state
    break

    default: return state

  }
}

export default reducer
