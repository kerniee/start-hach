import React from 'react';
import s from './Session.module.scss';

import {Col, Row} from "reactstrap";
import Widget from "../../components/Widget";
import InfoList from "../../components/InfoList";
import {applyMiddleware, createStore} from "redux";
import sessionReducer from "../../reducers/session";
import ApexChartBox from "./ApexChartBox";
import {Provider, connect } from "react-redux";
import SessionToggleBox from "./SessionToggleBox";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {fetchSession} from "../../actions/sessionPage";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(sessionReducer,
  {
    seriesData: [],
    allContent: []
  },
  composedEnhancer
)


class Session extends React.Component {
  constructor(props) {
    super(props);
    this.info = [
      ["OS", "Windows 10"],
      ["Geolocation", "Russia, Innopolis"],
      ["IP", "123.123.123.123"],
      ["User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"],
      ["Device", "PC"]
    ]



    // Frensis
    this.frensis_ids = ["b569fd18-1579-45a6-9802-7b523967d161"]

    console.log(this.props.match.params.session_id.toLowerCase())
    if (this.frensis_ids.includes(this.props.match.params.session_id.toLowerCase())) {
      this.info = [
        ["OS", "Unknown"],
        ["Geolocation", "Russia, Innopolis"],
        ["IP", "165.231.65.32"],
        ["User-Agent", "Unknown"],
        ["Device", "Smart TV"]
      ]
    }

    this.svyat_ids = ["90fff64b-e387-4421-ba3c-fd150dc90a16"]
    if (this.svyat_ids.includes(this.props.match.params.session_id.toLowerCase())) {
      this.info = [
        ["OS", "Unknown"],
        ["Geolocation", "Russia, Innopolis"],
        ["IP", "211.65.12.11"],
        ["User-Agent", "Unknown"],
        ["Device", "Smart Iron"]
      ]
    }

  }
  componentDidMount() {
    const sessionId = this.props.match.params.session_id;
    store.dispatch(fetchSession(sessionId))
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Session
        </h1>
        <Provider store={store}>
          <Row>
            <Col lg={3} xs={12}>
              <Widget title={<h4>Information</h4>} close collapse>
                <InfoList info={this.info}/>
              </Widget>
              {this.frensis_ids.includes(this.props.match.params.session_id.toLowerCase()) ? <Widget>
                <h1 style={{color: "red"}}>ERROR: BUZZING</h1>
              </Widget>: ""}
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
