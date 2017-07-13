# [Re]active-record

## Motivation
Many times setting up database bindings is the most tedious part of any react-redux application. Creating reducers, actions, binding those actions, etc.

## Solution
Reactive-record is a small utility for giving active-record like syntax bindings to react components. We use redux under the hood because who wants to write *another* state container.

## Documentation
1. [Quick Start](#quick-start)
1. [API](#api)

## Quick Start
A basic setup. You'll want to declare your models somewhere and make sure they're available to the store and wherever you're calling `withRecords`. The model is created once and passed around. Do not declare the same model twice in an application.

```javascript
import React, { Component } from 'react'
import { render } from 'react-dom'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reactiveRecord, {
  withRecords,
  all,
  find,
  create,
  updateAttributes,
  destroy
} from '@rentalutions/reactive-record'

const records = reactiveRecord({
  // config
})

const Todo = records.model({
  name: 'Todo',
  schema: {
    id: String,
    title: String,
    done: Boolean,
  }
})

// if you're using redux then you'll want to turn your models into the appropriate
// reducers. Each model comes with a handy reducer method that returns the correct
// reducer. TODO: have reducer declare its own name so you don't have to guess at the state slice.

const state = combineReducers({
  Todo: Todo.reducer
})

const store = createStore(state, applyMiddleware(thunk))

const App = withRecords([Todo])(class extends Component {
  constructor(props) {
    super(props)
    this.state = { loaded: null }
  }
  componentDidMount () {
    // GET ALL THE TODOS AND THEN SHOW THE DATA
    all(Todo)
      .then(res => this.setState({loaded: true}))
      .catch(err => {
        this.setState({loaded: false})
        console.warn(err.message)
      })
  }
  render () {
    const {todos: {entities: TODOS} } = this.props
    return this.state.loaded ? (
      <ul>
        {TODOS.map((todo, i) => (
          <li
            className={todo.done ? 'checked' : ''}
            key={id}
            onClick={ () => updateAttributes(todo.id, {done: !todo.done})}
          >
          <p>{todo.title}</p>
          <p>{todo.description}</p> // this will not show because it's not on the schema
          </li>
        ))}
      </ul>
    ) : null
  }
})

const ReduxApp = props => (
  <Provider store={store}>
    <App />
  </Provider>
)

render(<ReduxApp />, document.getElementById('root'))
```

## API

### `withRecords`
A higher order component that connects your component to the state slices of any models you're passing in. To be used with a redux implementation only.
 

## License
MIT &copy; [Patrick Krawczykowski](https://dreadful.design)
