import React from 'react';

import s from './User.module.scss';

class User extends React.Component {
    render() {
        return (
            <p className={s.redText}>Test text {console.log(this.props)}</p>
        );
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
              <table class="table">
              <tbody>
                <InfoList info={userInfo}/>
                </tbody>
              </table>
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
