import { ADD_ROOM } from "../constants/action-types";

const initialState = {
  rooms: []
};

function rooms(state = initialState, action) {
  if (action.type === ADD_ROOM) {
    const roomsObj =  Object.assign({}, state, {
      rooms: state.rooms.concat(action.payload)
    });
    return roomsObj;
  }
  return state;
}

export default rooms;