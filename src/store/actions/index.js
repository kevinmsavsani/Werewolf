import { ADD_ROOM, STORE_USER } from "../constants/action-types";

export function addRoom(payload) {
  return { type: ADD_ROOM, payload };
}

export function storeUser(payload) {
  return { type: STORE_USER, payload };
}