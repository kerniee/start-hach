export const TOGGLE = 'TOGGLE';

export default function toggle(id) {
  return {
    type: TOGGLE,
    id,
  };
}