# [Re]active-record

## Motivation
Many times setting up database bindings is the most tedious part of any react-redux application. Creating reducers, actions, binding those actions, etc.

## Solution
Reactive-record is a small utility for giving active-record like syntax bindings to react components. We use redux under the hood because who wants to write *another* state container.

## Documentation
1. Introduction
1. [Quick Start](#quick-start)
1. API

## Quick Start
A basic setup

```javascript
import React, { Component } from 'react'
import { render } from 'react-dom'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reactiveRecord, { withRecords } from '@rentalutions/reactive-record'

const records = new reactiveRecord({
  // config
})

const Todo = new records.model({
  name: 'Todo',
  schema: {
    id: String,
    title: String,
    done: Boolean,
  }
})

const state = combineReducers({
  //
  Todo: Todo.reducer
})

const store = createStore(state, applyMiddleware(thunk))

const App = withRecords([Todo])(class extends Component {
  componentDidMount () {
    this.props.todo_actions.all()
  }
  render () {
    const {todos: {records, entities}, todo_actions} = this.props
    return (
      <ul>
        {records.map(id => (
          <li
            className={entities[id].done ? 'checked' : ''}
            key={id}
            onClick={ _ => todo_actions.updateAttributes(id, {done: !entities[id].done})}
          >{entities[id].title}</li>
        ))}
      </ul>
    )
  }
})

const ReduxApp = props => (
  <Provider store={store}>
    <App />
  </Provider>
)

render(<ReduxApp />, document.getElementById('root'))
```

Now you have a user model attached as props to the app component. This means you
have direct access to the record and also get all the bindings you need to update
an api of same-origin.

```javascript
this.props.todos // normalized record object
this.props.todo_actions.find(id) // GET one record from DB
this.props.todo_actions.all() // GET all records from DB
this.props.todo_actions.updateAttributes( id, {title: 'Pick up Milk'}) // update and save
this.props.todo_actions.delete(id) // destroy the fucking todo
```
