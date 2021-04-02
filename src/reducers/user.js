import {TOGGLE} from "../actions/userPage";

export default function userReducer(state, action) {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        profiles: state.profiles.map((prof, i) => {
          if (i === action.id) {
            return {
              ...prof,
              show: !prof.show
            }
          }
          return prof
        })
      }
    default:
      return state;
  }
}