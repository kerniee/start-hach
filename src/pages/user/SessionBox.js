import Widget from "../../components/Widget";
import React from "react";
import {connect} from "react-redux";
import toggle from "../../actions/userPage";
import {Col, Row} from "reactstrap";
import config from "../components/charts/config";
import {ColorBar} from "./ColorBar";
import s from './User.module.scss';
import {Link} from "react-router-dom";

const mapStateToProps = state => {
  const trueProfiles = state.profiles.reduce((result, prof, i) => {
    if (prof.show) {
      result.push(i)
    }
    return result;
  }, [])
  return {
    sessions: state.sessions.filter(session => (
      session.profiles.filter(profile => trueProfiles.includes(profile)).length !== 0
    ))
  }
};

const colors = config.chartColors;
export const sessionBarColor = [
  colors.blue,
  colors.green,
  colors.red,
  colors.orange,
  colors.pink,
  colors.purple,
  colors.teal
];

function SessionRow({session, i}) {
  const data = session.profiles.map(prof => ({
    color: sessionBarColor[prof % sessionBarColor.length]
  }))
  return (
    <Row className={"pb-3"}>
      <div className={s.sessionRow + " flex"}>
        {session.info}
        <Link to={"/app/sessions/" + i.toString()} className="btn btn-default">More</Link>
      </div>
      <ColorBar data={data}/>
    </Row>
  );
}

class SessionBox extends React.Component {
  render() {
    console.log(this.props)
    return (
      <Widget title={
        <h4>
          Sessions
        </h4>
      } close collapse>
        <Col>
          {this.props.sessions.map((session, i) => {
            return <SessionRow session={session} i={i}/>
          })}
        </Col>
      </Widget>
    )
  }
}

export default connect(mapStateToProps, {toggle})(SessionBox)