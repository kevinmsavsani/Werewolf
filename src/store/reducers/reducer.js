import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

const reducer = combineReducers({
  todos: todos,
  counter: counter
})

export default reducer