import { ADD_ROOM } from "../constants/action-types";

export function addRoom(payload) {
  return { type: ADD_ROOM, payload };
}