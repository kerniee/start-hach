import React from "react";
import {Col, Input, Row} from "reactstrap";
import s from "../pages/user/User.module.scss";
import {ColorBar} from "../pages/user/ColorBar";
import {sessionBarColor} from "../pages/user/SessionBox";
import Widget from "./Widget";

export default ({name, profiles, onChangeHandler}) => (
  <Widget title={
    <h4>
      {name}
    </h4>
  } close collapse>
    <Row>
      {profiles.map((pair, i) => {
        return <Col md={4} lg={3} xs={12} key={pair + i}>
          <div>
            <Input
              id={`checkbox ${i}`}
              type="checkbox"
              className={s.checkboxInList}
              checked={profiles[i].show}
              onChange={onChangeHandler(i)}
            />
            {profiles[i].name}
          </div>
          <ColorBar data={[{color: sessionBarColor[i % sessionBarColor.length]}]}/>
        </Col>
      })}
    </Row>
  </Widget>
);