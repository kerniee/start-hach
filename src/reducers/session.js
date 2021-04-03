import {TOGGLE} from "../actions/sessionPage";

export default function sessionReducer(state, action) {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        allContent: state.allContent.map((content, i) => {
          if (i === action.id) {
            return {
              ...content,
              show: !content.show
            }
          }
          return content
        })
      }
    default:
      return state;
  }
}