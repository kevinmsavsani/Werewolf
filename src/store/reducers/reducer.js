import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'
import rooms from "./rooms"

const reducer = combineReducers({
  todos: todos,
  counter: counter,
  rooms: rooms
})

export default reducer