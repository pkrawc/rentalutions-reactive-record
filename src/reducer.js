const reducer = (state, action, model) => {
  switch (action.type) {
    case `CREATED_${model.actionName}_RECORD`: {
      return {
        ...state,
        [model.name]: {
          ...state[model.name],
          [action.payload.id]: action.payload
        }
      }
    }
    case `FETCHED_ALL_${model.actionName}`: {
      return {
        ...state,
        [model.name]: [
          ...state[model.name],
          ...action.payload
        ]
      }
    }
    case `FETCHED_ONE_${model.actionName}`: {
      return state
    }
    case `UPDATED_${model.actionName}_ATTRIBUTES`: {
      return {
        ...state,
        [model.name]: {
          ...state[model.name],
          [action.payload.id]: {
            ...state[model.name][action.payload.id],
            ...action.payload
          }
        }
      }
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
