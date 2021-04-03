import React from "react";
import {options} from "./mockData";
import Chart from "react-apexcharts";
import {connect} from "react-redux";
import toggle from "../../actions/sessionPage";
import Widget from "../../components/Widget";

function filterSeriesData(series, allContent) {
  const contentNames = []
  allContent.forEach(content => {
    if(content.show) {
      contentNames.push(content.name)
    }
  })
  function filter(data) {
    return data.filter(event => (
      contentNames.includes(event.x)
    ))
  }
  const newSeries = []
  series.forEach(events => {
    const newData = filter(events.data);
    if(newData.length !== 0) {
      newSeries.push({
        name: events.name,
        data: newData
      })
    }
  })
  return newSeries
}

const mapStateToProps = state => {
  console.log("UPDATED CHART")
  const series = filterSeriesData(state.seriesData, state.allContent)
  return {series}
};

export class ApexChartBox extends React.Component {
  render() {
    console.log("Apex redraw")
    return (
      <Widget
        title={
          <h4>
            Content statistics
          </h4>
        }
        close collapse>
        <div id="chartttt">
          <Chart options={options} series={this.props.series} type="rangeBar" height={350}/>
        </div>
      </Widget>
    );
  }
}

export default connect(mapStateToProps, {toggle})(ApexChartBox)