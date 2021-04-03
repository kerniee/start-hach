import React, {useEffect, useState} from "react";
import {Col, Input, Row} from "reactstrap";
import s from "../pages/user/User.module.scss";
import {ColorBar} from "../pages/user/ColorBar";
import {barColors} from "./Colors";
import Widget from "./Widget";
import config from "../config";

async function getQuality(items) {
  let jsons = []
  console.log("ITEMs: ", items)
  for(let i = 0; i<items.length; i++) {
    console.log("ITEM: ", items[i].name)
    const url = new URL("profiles/" + items[i].name + "/quality", config.backend.ip).href
    // fetch(url).then(res => res.json()).then(result => {
    //   setQuality(result)
    // }, []);
    let resp = await fetch(url)
    let json = await resp.json()
    jsons.push(json)
    // setQuality([
    //   ...quality,
    //
    // ])
  }
  return jsons
}

export default ({name, items, onChangeHandler, noColorBar=false}) => {
  let [quality, setQuality] = useState([])
  useEffect(() => {
    if(!noColorBar) {
      getQuality(items).then(jsons => {
        console.log(jsons)
        setQuality(jsons)
      })
    }
  }, [items])
  return <Widget title={
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
            <p style={{overflowWrap: "anywhere"}}>
              {items[i].name.length > 23 ? items[i].name.substr(0, 22) + "..." : items[i].name}
            </p>
          </div>
          {i in quality ? <p>Bufferization: {quality[i].bufferization} Quality: {quality[i].quality}</p> : (!noColorBar ? "LOADING" : "")}
          {!noColorBar ? <ColorBar data={[{color: barColors[i % barColors.length]}]}/> : ""}
        </Col>
      })}
    </Row>
  </Widget>
};