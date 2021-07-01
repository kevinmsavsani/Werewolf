import {UPDATE_USERS } from "../constants/action-types";

const initialState = {
  users: []
};

function users(state = initialState, action) {
  if (action.type === UPDATE_USERS) {
    return action.payload;
  }
  return state;
}

export default users;