import {getSession} from "../core/Backend";

export const TOGGLE = 'TOGGLE';
export const LOAD = "LOAD";

export default function toggle(id) {
  return {
    type: TOGGLE,
    id,
  };
}

export function fetchSession(id) {
  return async (dispatch) => {
    const data = await getSession(id);
    console.log("fetchSession", data);
    dispatch({type: LOAD, payload: data})
  }
}