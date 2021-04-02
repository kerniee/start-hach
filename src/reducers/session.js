import {TOGGLE} from "../actions/sessionPage";
import {LOAD} from "../actions/sessionPage";
import {createProfiles} from "./user";

function transformServerData(data) {
  let allContent = new Set();
  let events = {}
  data.actions.forEach(event => {
    if (event.action_id === "buffer_start") {
      return;
    }
    if (!(event.action_id in events)) {
      events[event.action_id] = []
    }

    let startDate = new Date(event.event_time);
    let endDate = new Date(event.event_time);
    if (event.action_id === "buffer_stop") {
      startDate.setMilliseconds(endDate.getMilliseconds() - event.bufferization_time)
    } else {
      startDate.setMilliseconds(endDate.getMilliseconds() - 2000);
    }

    events[event.action_id].push(
      {
        x: event.content_id,
        y: [
          startDate.getTime(),
          endDate.getTime()
        ]
      }
    );
    allContent.add(event.content_id);
  })
  const series = Object.keys(events).map(key => ({
    name: key,
    data: events[key]
  }))
  allContent = createProfiles(Array.from(allContent))
  return [series, allContent]
}

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
    case LOAD:
      const [seriesData, allContent] = transformServerData(action.payload);
      return {
        ...state,
        seriesData: seriesData,
        allContent: allContent
      }
    default:
      return state;
  }
}