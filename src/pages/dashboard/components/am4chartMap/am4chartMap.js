import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";

import mock_users from './mock/users';
import mock_errors from './mock/errors';
import mock_buffering from './mock/buffering';
import mock_quality from './mock/quality';

import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import s from "./am4chartMap.module.scss";

let users = mock_users.sort(() => 0.5 - Math.random()).slice(0, 1057);
let errors = mock_errors;

let buffering = mock_buffering;
let average_buff_time = buffering.map(item => item.time).reduce((a, b) => a + b, 0) / buffering.length;

let quality = mock_quality;
let average_quality = quality.map(item => item.quality).reduce((a, b) => a + b, 0) / quality.length;

let layers = [
  {
    title: "Users",
    source: users,
    color: "#C7D0FF"
  },
  {
    title: "Errors",
    source: errors,
    color: "#FFA630"
  },
  {
    title: "Buffering Time",
    source: buffering,
    color: "#7DD181"
  },
  {
    title: "Streaming Quality",
    source: quality,
    color: "#EAD2AC"
  }
]

class Am4chartMap extends Component {
  state = {
    layer: 0,
  };

  changeLayer = (layer) => {
    var newLayer = layer;
    this.updateMapLayer(newLayer);
    this.setState({
      layer: newLayer,
    });
  };

  performSearch = (value) => {
    let collection = layers?.[this.state.layer].source
    if (!collection) return;
    
    let element = collection.find(element => element.tooltip.toLowerCase().includes(value.toLowerCase()))
    if (element && value.length > 2) {
      this.map.deltaLatitude = -element.latitude;
      this.map.deltaLongitude = -element.longitude;
      this.map.homeZoomLevel = 5;
      this.props.updateSearchField(element.tooltip)
    } else {
      this.map.homeZoomLevel = 1.2;
    }
    this.map.goHome();
    this.setState({});
  }

  componentDidMount() {
    this.props.updateAverageValues(average_buff_time, average_quality)
    let map = am4core.create("map", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.percentHeight = 90;
    map.dy = 10;
    map.projection = new am4maps.projections.Orthographic();
    map.panBehavior = "rotateLongLat";

    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    map.homeZoomLevel = 1.2;

    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.layout = "horizontal";
    map.zoomControl.align = "left";
    map.zoomControl.valign = "bottom";
    map.zoomControl.dy = 10;
    map.zoomControl.contentHeight = 20;

    map.zoomControl.minusButton.background.fill = am4core.color("#495057");
    map.zoomControl.minusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.minusButton.background.cornerRadius(2, 2, 2, 2);
    map.zoomControl.minusButton.label.text = "–"
    map.zoomControl.minusButton.label.fill = am4core.color("#efefef");
    map.zoomControl.minusButton.label.fontWeight = 600;
    map.zoomControl.minusButton.label.fontSize = 24;
    map.zoomControl.minusButton.scale = 0.75;
    map.zoomControl.minusButton.label.scale = 0.75;
    
    map.zoomControl.plusButton.background.fill = am4core.color("#495057");
    map.zoomControl.plusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.minusButton.background.cornerRadius(2, 2, 2, 2);
    map.zoomControl.plusButton.label.fontWeight = 600;
    map.zoomControl.plusButton.label.fontSize = 24;
    map.zoomControl.plusButton.label.align = "center";
    map.zoomControl.plusButton.label.fill = am4core.color("#efefef");
    map.zoomControl.plusButton.scale = 0.75;
    map.zoomControl.plusButton.label.scale = 0.75;
    map.zoomControl.plusButton.dx = 5;
    let plusButtonHoverState = map.zoomControl.plusButton.background.states.create(
      "hover"
    );
    plusButtonHoverState.properties.fill = am4core.color("#efefef");
    let minusButtonHoverState = map.zoomControl.minusButton.background.states.create(
      "hover"
    );
    minusButtonHoverState.properties.fill = am4core.color("#efefef");
    
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#35404a");
    polygonTemplate.stroke = am4core.color("#5a6e82");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#5a6e82");

    this.map = map;
    this.updateMapLayer(0);
  }

  updateMapLayer = (layer) => {
    while (this.map.series.length > 1) {
      this.map.series.removeIndex(this.map.series.length - 1);
    }

    let citySeries = this.map.series.push(new am4maps.MapImageSeries());
    let item = layers[layer];

    citySeries.data = item.source;
    citySeries.dataFields.value = "size";
    let city = citySeries.mapImages.template;
    city.nonScaling = true;
    city.propertyFields.latitude = "latitude";
    city.propertyFields.longitude = "longitude";
    let circle = city.createChild(am4core.Circle);
    circle.fill = am4core.color(item.color);
    circle.strokeWidth = 0;
    let circleHoverState = circle.states.create("hover");
    circleHoverState.properties.strokeWidth = 1;
    circle.tooltipText = "{tooltip}";
    circle.propertyFields.radius = "size";
    this.props.updateMapRecords(item.source.length)
  };

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div className={s.mapChart}>
        <div className={s.stats}>
          <p className="h4 m-0">
            <span>Layer: </span>
            <span className="mr-xs fw-semi-bold">
              {layers[this.state.layer].title}
              {" "}
            </span>
            <i className="fa fa-map-marker" />
          </p>
        </div>
        <div className={s.map} id="map">
          <span>Alternative content for the map</span>
        </div>
      </div>
    );
  }
}

export default Am4chartMap;
