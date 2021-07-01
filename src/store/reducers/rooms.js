import { ADD_ROOM } from "../constants/action-types";

const initialState = {
  rooms: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ROOM) {
    return Object.assign({}, state, {
      rooms: state.rooms.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;