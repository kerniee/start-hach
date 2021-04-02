export const TOGGLE = 'TOGGLE';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export default function toggle(id) {
  return {
    type: TOGGLE,
    id,
  };
}