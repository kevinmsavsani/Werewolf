import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'
import rooms from "./rooms"
import user from "./user"

const reducer = combineReducers({
  todos: todos,
  counter: counter,
  rooms: rooms,
  user: user
})

export default reducer