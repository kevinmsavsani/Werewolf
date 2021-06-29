
// initialization
const initialState = {
  rooms: []
};

// action creators
export function insertItem({ room, index }) {
    return {
      type: "INSERT_ITEM",
      room,
      index,
    };
}

export function removeRoomSplice({ index }) {
    return {
      type: "REMOVE_ROOM_SPLICE",
      index,
    };
}

// immutability helpers
function removeItemSplice(array, action) {
  let newArray = array.slice()
  newArray.splice(action.index, 1)
  return newArray
}

function insertItemImHelper(array, action) {
    let newArray = array.slice()
    newArray.splice(action.index, 0, action.item)
    return newArray
  }

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {  
  case "REMOVE_ROOM_SPLICE":
    return {
      ...state,
      rooms: removeItemSplice(state.rooms, action)
    };
    case "INSERT_ITEM":
      return {
        ...state,
        rooms: insertItemImHelper(state.rooms, action)
      };
  default:
     return state;
  }
}