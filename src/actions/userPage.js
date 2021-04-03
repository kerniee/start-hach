import {getAccount} from "../core/Backend";

export const TOGGLE = 'TOGGLE';
export const LOAD = 'LOAD';

export default function toggle(id) {
  return {
    type: TOGGLE,
    id,
  };
}

export function fetchUser(id) {
  return async (dispatch) => {
    const data = await getAccount(id);
    console.log("fetchUser", data);
    dispatch({type: LOAD, payload: data})
  }
}