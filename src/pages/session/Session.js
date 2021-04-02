import React, {useState} from 'react';
import s from './Session.module.scss';
import Chart from "react-apexcharts";

import config from "../components/charts/config";
import {Col, Row} from "reactstrap";
import Widget from "../../components/Widget";
import InfoList from "../../components/InfoList";

const colors = config.chartColors;
let columnColors = [
  colors.blue,
  colors.green,
  colors.red,
];


//charts(FusionCharts)


const series = [
  {
    name: 'Buffer',
    data: [
      {
        x: 'Content 1',
        y: [
          new Date('2019-03-05T03:00:00').getTime(),
          new Date('2019-03-05T03:30:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T03:20:00').getTime(),
          new Date('2019-03-05T03:50:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T03:40:00').getTime(),
          new Date('2019-03-05T04:00:00').getTime()
        ]
      },
      {
        x: 'Content 3',
        y: [
          new Date('2019-03-05T02:50:00').getTime(),
          new Date('2019-03-05T02:55:00').getTime()
        ]
      },
      {
        x: 'Content 3',
        y: [
          new Date('2019-03-05T03:00:00').getTime(),
          new Date('2019-03-05T03:10:00').getTime()
        ]
      },
      {
        x: 'Content 4',
        y: [
          new Date('2019-03-05T03:30:00').getTime(),
          new Date('2019-03-05T03:40:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T05:00:00').getTime(),
          new Date('2019-03-05T05:10:00').getTime()
        ]
      }
    ]
  },
  {
    name: 'Pause',
    data: [
      {
        x: 'Content 1',
        y: [
          new Date('2019-03-05T03:10:00').getTime(),
          new Date('2019-03-05T03:20:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T03:50:00').getTime(),
          new Date('2019-03-05T04:10:00').getTime()
        ]
      },
      {
        x: 'Content 3',
        y: [
          new Date('2019-03-05T04:30:00').getTime(),
          new Date('2019-03-05T04:40:00').getTime()
        ]
      },
      {
        x: 'Content 4',
        y: [
          new Date('2019-03-05T04:40:00').getTime(),
          new Date('2019-03-05T04:45:00').getTime()
        ]
      },
      {
        x: 'Content 4',
        y: [
          new Date('2019-03-05T03:05:00').getTime(),
          new Date('2019-03-05T03:20:00').getTime()
        ]
      }
    ]
  },
  {
    name: 'Error',
    data: [
      {
        x: 'Content 1',
        y: [
          new Date('2019-03-05T03:45:00').getTime(),
          new Date('2019-03-05T03:46:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T03:00:00').getTime(),
          new Date('2019-03-05T03:10:00').getTime()
        ]
      },
    ]
  }
]

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.series,
      options: {
        chart: {
          height: 450,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%'
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: colors.textColor,
              fontSize: "14px",
            },
          },
          axisBorder: {
            show: true,
            color: colors.gridLineColor
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: colors.textColor,
              fontSize: "14px",
            },
          },
          axisBorder: {
            show: true,
            color: colors.textColor
          },
        },
        colors: columnColors,
        tooltip: {
          theme: "dark",
          x: {
            format: 'yy.MM.dd HH:mm:ss',
          }
        },
        grid: {
          borderColor: colors.gridLineColor,
        },
        stroke: {
          width: 1
        },
        fill: {
          type: 'solid',
          opacity: 0.6
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          show: true,
          labels: {
            colors: colors.textColor,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 5
          },
        }
      },
    };
  }

  render() {
    return (
      <div id="chartttt">
        <Chart options={this.state.options} series={this.state.series} type="rangeBar" height={350}/>
      </div>
    );
  }
}


function Session() {
  const [state] = useState({
    info: [
      ["OS", "Windows 10"],
      ["Geolocation", "Russia, Innopolis"],
      ["IP", "123.123.123.123"],
      ["User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"]
    ]
  })
  return (
    <div className={s.root}>
      <h1 className="page-title">
        Session <span className="fw-semi-bold">#1</span>
      </h1>
      <Row>
        <Col lg={3} xs={12}>
          <Widget title={<h4>Info</h4>} close collapse>
            <InfoList info={state.info}/>
          </Widget>
        </Col>
        <Col lg={9} xs={12}>
          <Widget
            title={
              <h4>
                Content statistics
              </h4>
            }
            close collapse>
            <ApexChart series={series}/>
          </Widget>
        </Col>
      </Row>
    </div>
  );
}

export default Session;
