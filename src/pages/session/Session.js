import React from 'react';
import s from './Session.module.scss';

import {Col, Row} from "reactstrap";
import Widget from "../../components/Widget";
import InfoList from "../../components/InfoList";
import serverData from "./mockDataServer"
import {createStore} from "redux";
import sessionReducer from "../../reducers/session";
import ApexChartBox from "./ApexChartBox";
import {Provider, connect } from "react-redux";
import SessionToggleBox from "./SessionToggleBox";
import {createProfiles} from "../../reducers/user";


function transformServerData(data) {
  let allContent = new Set();
  let events = {}
  data.actions.forEach(event => {
    if(event.action_id === "buffer_start") {
      return;
    }
    if(!(event.action_id in events)) {
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


const [seriesData, allContent] = transformServerData(serverData);
const store = createStore(sessionReducer,
  {
    seriesData: seriesData,
    allContent: allContent
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


class Session extends React.Component {
  constructor(props) {
    super(props);
    this.info = [
      ["OS", "Windows 10"],
      ["Geolocation", "Russia, Innopolis"],
      ["IP", "123.123.123.123"],
      ["User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"]
    ]
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Session <span className="fw-semi-bold">#1</span>
        </h1>
        <Provider store={store}>
          <Row>
            <Col lg={3} xs={12}>
              <Widget title={<h4>Info</h4>} close collapse>
                <InfoList info={this.info}/>
              </Widget>
            </Col>
            <Col lg={9} xs={12}>
              <SessionToggleBox/>
              <ApexChartBox/>
            </Col>
          </Row>
        </Provider>
      </div>
    );
  }
}

export default connect(state => state.seriesData)(Session);
