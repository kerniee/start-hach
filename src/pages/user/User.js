import React, {useEffect, useState} from 'react';
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
import {mockUsers} from "../../components/Header/SearchUser";
import config from "../../config";


function getAllUserInfo() {
  return {
    sessions: [],
    profiles: []
  }
}

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(userReducer, getAllUserInfo(),
  composedEnhancer
)

function User(props) {
  let [info, setInfo] = useState(userInfo)
  // let [state, setState] = useState({bufferization: -1, quality: -1})
  // const url = new URL("profiles/" + props.match.params.session_id + "/quality", config.backend.ip).href
  // fetch(url).then(res => res.json()).then(result => {
  //   setState(result)
  // }, []);
  useEffect(() => {
    const userId = props.match.params.user_id;

    let id = props.match.params.user_id.toLowerCase()
    mockUsers.forEach(usernameAndID => {
      if (id.startsWith(mockUsers[0][1])) {
        setInfo([
          ["Name", "Frensis"],
          ["Surname", "Bok"],
          ["Date of registration", "11.04.2020"]
        ])
      }
      if (id.startsWith(mockUsers[1][1])) {
        setInfo([
          ["Name", "Eugen"],
          ["Surname", "Bazhenov"],
          ["Date of registration", "27.05.2019"]
        ])
      }
      if (id.startsWith(mockUsers[2][1])) {
        setInfo([
          ["Name", "Svyatoslav"],
          ["Surname", "Vernidubovich"],
          ["Date of registration", "01.07.2020"]
        ])
      }
    })


    store.dispatch(fetchUser(userId))
  }, []);

  return (
    <div className={s.root}>
      <h1 className="page-title">
        User <span className="fw-semi-bold">#{props.match.params.user_id}</span>
      </h1>
      <Provider store={store}>
        <Row>
          <Col lg={3} xs={12}>
            <Widget title={<h4>Information</h4>} close collapse>
              <table class="table">
              <tbody>
                <InfoList info={info}/>
                </tbody>
              </table>
            </Widget>
          </Col>
          <Col lg={9} xs={12}>
            <ProfilesToggleBox session_id={props.match.params.session_id}/>
            <SessionBox/>
          </Col>
        </Row>
      </Provider>
    </div>
  );
}

export default User;
