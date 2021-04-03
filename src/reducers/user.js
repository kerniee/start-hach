import {TOGGLE, LOAD} from "../actions/userPage";

export function createProfiles(profiles) {
  let arr = Array(profiles.length);
  for (let i = 0; i < profiles.length; i++) {
    arr[i] = {
      name: profiles[i],
      show: true
    }
  }
  return arr;
}

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
    case LOAD:
      let profiles = []
      let sessionsDict = {}
      action.payload.forEach(profile => {
        profiles.push(profile.id);
        profile.sessions.forEach(sessionId => {
          if (!(sessionId in sessionsDict)) {
            sessionsDict[sessionId] = [profile.id]
          } else {
            sessionsDict[sessionId].push(profile.id)
          }
        })
      })
      const sessions = Object.keys(sessionsDict).map(key => ({
        info: key,
        id: key,
        profiles: sessionsDict[key].map((session_id) => (profiles.indexOf(session_id)))
      }))
      console.log("SESSIONS", sessions)
      return {
        ...state,
        profiles: createProfiles(profiles),
        sessions: sessions
      }
    default:
      return state;
  }
}

