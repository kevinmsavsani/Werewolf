
// initialization
const initialState = [];

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
    return [...array,action.room]
  }

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {  
  case "REMOVE_ROOM_SPLICE":
    return [
      ...state,
      ...removeItemSplice(state, action)
    ];
    case "INSERT_ITEM":
      return [
        ...state,
        action.room
  ];
  default:
     return state;
  }
}