import { ADD_ROOM } from "../constants/action-types";

const initialState = {
  rooms: []
};

function rooms(state = initialState, action) {
  console.log(action)
  if (action.type === ADD_ROOM) {
    console.log(state)
    const roomsObj =  Object.assign({}, state, {
      rooms: state.rooms.concat(action.payload)
    });
    console.log(roomsObj)
    return roomsObj;
  }
  return state;
}

export default rooms;