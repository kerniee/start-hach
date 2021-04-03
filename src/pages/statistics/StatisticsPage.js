import React, {useEffect, useState} from 'react';
import {Badge, Col, Progress, Row, Table} from "reactstrap";
import Widget from "../../components/Widget";
import ApexChart from "react-apexcharts";
import config from "../../config";
import {chartData} from "../components/charts/mock";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en'
import {Link} from "react-router-dom";

TimeAgo.addDefaultLocale(en)

// import s from './StatisticsPage.module.scss';


function StatisticsPage() {
  const [state, setState] = useState({
    resDistrLoaded: false,
    lastErrorLoaded: false,
    errorSessions: [],
    cd: chartData.apex.column,
    initEchartsOptions: {
      renderer: "canvas",
    },
    sparklineData: {
      series: [{data: [1, 7, 3, 5, 7, 8]}],
      options1: {
        colors: ["#db2a34"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
      options2: {
        colors: ["#2477ff"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
    },
  });

  // Resolution Distr
  useEffect(() => {
    const url = new URL("quality_minutes", config.backend.ip).href
    fetch(url).then(res => res.json()).then(result => {
        let cd = chartData.apex.column;
        cd.series = [
          {
            data: Object.values(result)
          }
        ]
        cd.options.xaxis.categories = Object.keys(result)
        setState({
          ...state,
          cd: cd,
          resDistrLoaded: true
        })

        const url = new URL("errorful_sessions", config.backend.ip).href
        fetch(url).then(res => res.json()).then(result => {
            setState({
              ...state,
              errorSessions: result,
              lastErrorLoaded: true,
              cd: cd,
              resDistrLoaded: true
            })
          },
          (error) => {
            console.log(error)
          })
      },
      (error) => {
        console.log(error)
      })
  }, []);

  // Last error sessions
  // useEffect(() => {
  //
  // }, []);

  return (
    <Row>
      <Col lg={7} xs={12}>
        <Widget
          title={
            <h5>
              Column Chart <span className="fw-semi-bold">Resolution Distribution</span>
            </h5>
          }
          close
          collapse
        >
          {state.resDistrLoaded ? <ApexChart
            className="sparkline-chart"
            height={350}
            series={state.cd.series}
            options={state.cd.options}
            type={"bar"}
          /> : <h1>Loading...</h1>
          }

        </Widget>
      </Col>
      <Col lg={5} xs={12}>
        <Widget
          title={
            <h5>
              Last Sessions With <span className="fw-semi-bold">Errors</span>
            </h5>
          }
          close
          collapse
        >
          <Table striped>
            <thead>
            <tr className="fs-sm">
              <th className="hidden-sm-down">#</th>
              <th className="hidden-sm-down">Last Access Time</th>
              <th className="hidden-sm-down">Session</th>
            </tr>
            </thead>
            <tbody>
            {state.errorSessions.map((session, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>
                  <ReactTimeAgo date={new Date(new Date("2021").setMonth(-i))} locale="en-US"/>
                </td>
                <td>
                  <Link to={"/app/sessions/" + session}>{session}</Link>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Widget>
      </Col>
    </Row>
  );
}

export default StatisticsPage;
