import React, {useEffect} from 'react';
import s from './User.module.scss';

import {Col, Row} from "reactstrap";
import Widget from "../../components/Widget";
import InfoList from "../../components/InfoList";
import {userInfo} from "./mockData";
import {applyMiddleware, createStore} from "redux";
import userReducer from "../../reducers/user";
import {Provider} from "react-redux";
import ProfilesToggleBox from "./ProfilesToggleBox";
import SessionBox from "./SessionBox";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {fetchUser} from "../../actions/userPage";


function getAllUserInfo() {
  return {
    info: userInfo,
    sessions: [],
    profiles: []
  }
}

console.log(getAllUserInfo())
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(userReducer, getAllUserInfo(),
  composedEnhancer
)



function User(props) {
  useEffect(() => {
    const userId = props.match.params.user_id;
    console.log(userId)
    store.dispatch(fetchUser(userId))
  }, []);

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
