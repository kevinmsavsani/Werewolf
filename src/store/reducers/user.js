import { STORE_USER } from "../constants/action-types";

const initialState = {
  user: {}
};

function user(state = initialState, action) {
  if (action.type === STORE_USER) {
    return {user: action.payload};
  }
  return state;
}

export default user;