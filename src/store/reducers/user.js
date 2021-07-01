import { STORE_USER } from "../constants/action-types";

const initialState = {
  user: {}
};

function user(state = initialState, action) {
  console.log(action)
  if (action.type === STORE_USER) {
    console.log(state)
    console.log(action.payload)
    return {user: action.payload};
  }
  return state;
}

export default user;