const reducer = (state, action, model) => {
  switch (action.type) {
    case `CREATED_${model.actionName}`: {
      return state
    }
    case `GOT_ALL_${model.actionName}`: {
      return state
    }
    case `FOUND_${model.actionName}`: {
      return state
    }
    case `UPDATED_${model.actionName}_ATTRIBUTES`: {
      return state
    }
    case `DESTROYED_${model.actionName}_RECORD`: {
      return state
    }
    default: {
      return state
    }

  }
}

export default reducer
