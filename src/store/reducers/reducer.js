import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'
import rooms from "./rooms"
import user from "./user"
import users from "./users"

const reducer = combineReducers({
  todos: todos,
  counter: counter,
  rooms: rooms,
  user: user,
  users: users
})

export default reducer