const reducer = (state, action, model) => {
  switch (action.type) {
    case `CREATE_${model.actionName}`: {
      return state
    }
    case `GET_ALL_${model.actionName}`: {
      return state
    }
    case `FIND_${model.actionName}`: {
      return state
    }
    case `UPDATE_${model.actionName}_ATTRIBUTES`: {
      return state
    }
    case `DESTROY_${model.actionName}`: {
      return state
    }
    default: {
      return state
    }

  }
}

export default reducer
