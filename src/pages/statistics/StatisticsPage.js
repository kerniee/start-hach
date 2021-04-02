import React, {useEffect, useState} from 'react';
import {Col, Row} from "reactstrap";
import Widget from "../../components/Widget";
import ApexChart from "react-apexcharts";
import config from "../../config";
import {chartData} from "../components/charts/mock";

// import s from './StatisticsPage.module.scss';


function StatisticsPage() {
  const [state, setState] = useState({
    loaded: false,
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
          loaded: true
        })
      },
      (error) => {
        console.log(error)
      })
  }, []);

  return (
    <Row>
      <Col lg={7} xs={12}>
        <Widget
          title={
            <h5>
              Column Chart <span className="fw-semi-bold">Resolution</span>
            </h5>
          }
          close
          collapse
        >
          {state.loaded ? <ApexChart
            className="sparkline-chart"
            height={350}
            series={state.cd.series}
            options={state.cd.options}
            type={"bar"}
          /> : <h1>Loading...</h1>
          }

        </Widget>
      </Col>
    </Row>
  );
}

export default StatisticsPage;
