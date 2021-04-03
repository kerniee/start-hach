import React from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";

import Widget from "../../components/Widget";

import Map from "./components/am4chartMap/am4chartMap";
import Rickshaw from "./components/rickshaw/Rickshaw";

import AnimateNumber from "react-animated-number";

import s from "./Dashboard.module.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
      searchText: "",
      mapRecords: 0,
      averageBufferingTime: 0,
      averageQuality: 0
    };

    this.mapElement = React.createRef();
    this.checkTable = this.checkTable.bind(this);
  }

  handleClick = (layer) => {
    this.mapElement.current.changeLayer(layer);
  };

  handleSearchChange = (value) => {
    this.setState({
      searchText: value,
    });
  };

  performSearch = () => {
    this.mapElement.current.performSearch(this.state.searchText);
  };

  updateSearchField = (value) => {
    this.setState({
      searchText: value,
    });
  };

  updateAverageValues = (buffering, quality) => {
    this.setState({
      averageBufferingTime: Math.round(buffering * 100) / 100,
      averageQuality: Math.round(quality * 100) / 100
    })
  }

  updateMapRecords = (value) => {
    this.setState({
      mapRecords: value,
    });
  };

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Dashboard &nbsp;
          <small>
            <small>Informative Map</small>
          </small>
        </h1>

        <Row>
          <Col lg={7}>
            <Widget className="bg-transparent">
              <Map
                ref={this.mapElement}
                updateSearchField={this.updateSearchField}
                updateMapRecords={this.updateMapRecords}
                updateAverageValues={this.updateAverageValues}
              />
            </Widget>
          </Col>
          <Col lg={1} />

          <Col lg={4}>
            <Widget
              className="bg-transparent"
              title={
                <h5>
                  {" "}
                  Map
                  <span className="fw-semi-bold">&nbsp;Statistics</span>
                </h5>
              }
            >
              <h5 className={s.navTitle}>
                MAP LAYERS
                {/* eslint-disable-next-line */}
              </h5>
              {/* eslint-disable */}
              <ul className={s.layerLabels}>
                <li>
                  <i className="fa fa-circle mr-2" />
                  <span
                    className={s.labelName}
                    onClick={() => this.handleClick(0)}
                  >
                    Users
                  </span>
                </li>
                <li>
                  <i className="fa fa-circle mr-2" />
                  <span
                    className={s.labelName}
                    onClick={() => this.handleClick(1)}
                  >
                    Errors
                  </span>
                </li>
                <li>
                  <i className="fa fa-circle mr-2" />
                  <span
                    className={s.labelName}
                    onClick={() => this.handleClick(2)}
                  >
                    Buffering Time
                  </span>
                </li>
                <li>
                  <i className="fa fa-circle mr-2" />
                  <span
                    className={s.labelName}
                    onClick={() => this.handleClick(3)}
                  >
                    Streaming Quality
                  </span>
                </li>
              </ul>
              <p>
                <div className="input-group mt">
                  <input
                    type="text"
                    className="form-control bg-custom-dark border-0"
                    placeholder="Search Map"
                    value={this.state.searchText}
                    onChange={(event) =>
                      this.handleSearchChange(event.target.value)
                    }
                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      className={`btn btn-subtle-blue ${s.searchBtn}`}
                      onClick={this.performSearch}
                    >
                      <i className="fa fa-search text-light" />
                    </button>
                  </span>
                </div>
              </p>
              <p>
                Status: <strong>Live</strong>
              </p>
              <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-map-marker" />
                </span>{" "}
                &nbsp;
                <AnimateNumber
                  value={this.state.mapRecords}
                  initialValue={0}
                  duration={500}
                  stepPrecision={0}
                />{" "}
                map records
              </p>
              <h5 className={s.navTitle}>
                AVERAGE VALUES
                {/* eslint-disable-next-line */}
              </h5>
              {/* eslint-disable */}
              <div className="row progress-stats my-2">
                <div className="col-md-9 col-12">
                  <p className="description deemphasize mb-xs text-white">
                    Buffering Time
                  </p>
                  <Progress
                    color="primary"
                    value={this.state.averageBufferingTime}
                    className="bg-subtle-blue progress-xs"
                    max="10"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={this.state.averageBufferingTime} />
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats mb-2">
                <div className="col-md-9 col-12">
                  <p className="description deemphasize mb-xs text-white">
                    Streaming Quality
                  </p>
                  <Progress
                    color="danger"
                    value={this.state.averageQuality}
                    className="bg-subtle-blue progress-xs"
                    max="5"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={this.state.averageQuality}/>
                    </small>
                  </span>
                </div>
              </div>
              <h5 className={s.navTitle}>
                MAP DISTRIBUTIONS
                {/* eslint-disable-next-line */}
              </h5>
              {/* eslint-disable */}
              <p>
                Tracking: <strong>Active</strong>
              </p>
            </Widget>
          </Col>
        </Row>

        <Row>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> USERBASE GROWTH </h6>}>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Overall Growth</h6>
                  <p className="value">76.38%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Monthly</h6>
                  <p className="value">10.38%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">3.38%</p>
                </div>
              </div>
              <Progress
                color="success"
                value="60"
                className="bg-subtle-blue progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-up" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;17% higher</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> TRAFFIC VALUES </h6>}>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Overall Values</h6>
                  <p className="value">17 567 318</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Monthly</h6>
                  <p className="value">55 120</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">9 695</p>
                </div>
              </div>
              <Progress
                color="danger"
                value="60"
                className="bg-subtle-blue progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-down" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;8% lower</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
