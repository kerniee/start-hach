import React from "react";
import {Col, Input, Row} from "reactstrap";
import s from "../pages/user/User.module.scss";
import {ColorBar} from "../pages/user/ColorBar";
import {barColors} from "./Colors";
import Widget from "./Widget";


export default ({name, items, onChangeHandler, noColorBar=false}) => (
  <Widget title={
    <h4>
      {name}
    </h4>
  } close collapse>
    <Row>
      {items.map((pair, i) => {
        return <Col md={4} lg={3} xs={12} key={pair + i}>
          <div>
            <Input
              id={`checkbox ${i}`}
              type="checkbox"
              className={s.checkboxInList}
              checked={items[i].show}
              onChange={onChangeHandler(i)}
            />
            {items[i].name}
          </div>
          {!noColorBar ? <ColorBar data={[{color: barColors[i % barColors.length]}]}/> : ""}

        </Col>
      })}
    </Row>
  </Widget>
);