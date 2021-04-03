import { DISMISS_ALERT } from '../actions/alerts';

const defaultState = {
  alertsList: [
    {
      id: 0,
      title: 'Metrics Coverage',
      value: 65,
      color: 'primary',
      footer: '65% completed',
    },
    {
      id: 1,
      title: 'Layers Coverage',
      value: 42,
      color: 'danger',
      footer: '42% completed',
    },
  ],
};

export default function alertsReducer(state = defaultState, action) {
  let index;
  switch (action.type) {
    case DISMISS_ALERT:
      state.alertsList.forEach((alert, alertIndex) => {
        if (alert.id === action.id) {
          index = alertIndex;
        }
      });
      return Object.assign({}, state, {
        alertsList: [
          ...state.alertsList.slice(0, index),
          ...state.alertsList.slice(index + 1),
        ],
      });
    default:
      return state;
  }
}
