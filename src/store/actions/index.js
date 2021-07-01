import { ADD_ROOM, STORE_USER, UPDATE_USERS } from "../constants/action-types";

export function addRoom(payload) {
  return { type: ADD_ROOM, payload };
}

export function storeUser(payload) {
  return { type: STORE_USER, payload };
}

export function updateUsers(payload) {
  return { type: UPDATE_USERS, payload };
}