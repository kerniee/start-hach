import React from 'react';
import s from './User.module.scss';

import {Col, Row} from "reactstrap";
import Widget from "../../components/Widget";
import InfoList from "../../components/InfoList";
import {const_profiles, sessions, userInfo} from "./mockData";
import {createStore} from "redux";
import userReducer from "../../reducers/user";
import {Provider} from "react-redux";
import ProfilesToggleBox from "./ProfilesToggleBox";
import SessionBox from "./SessionBox";

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

// const info = {
//   profiles:,
//   sessions: sessions
// }


function getAllUserInfo() {
  return {
    info: userInfo,
    sessions: sessions,
    profiles: createProfiles(const_profiles)
  }
}

console.log(getAllUserInfo())
const store = createStore(userReducer, getAllUserInfo(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function User() {
  return (
    <div className={s.root}>
      <h1 className="page-title">
        User <span className="fw-semi-bold">#1</span>
      </h1>
      <Provider store={store}>
        <Row>
          <Col lg={3} xs={12}>
            <Widget title={<h4>Info</h4>} close collapse>
              <InfoList info={userInfo}/>
            </Widget>
          </Col>
          <Col lg={9} xs={12}>
            <ProfilesToggleBox/>
            <SessionBox/>
          </Col>
        </Row>
      </Provider>
    </div>
  );
}

export default User;
