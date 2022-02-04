import React from "react";
import "../App.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import counties from "../counties/us-counties-state.json";

interface MapState {
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[];
}

interface MapProps {
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[];
  handleChangeClick: any;
  selectedRegion: string;
}

class Map extends React.Component<MapProps, MapState> {
  constructor(props: any) {
    super(props);
    this.state = {
      counties: [],
    };
  }
  countryStyle = {
    fillColor: "white",
    fillOpacity: 0.1,
    color: "black",
    weight: 2,
    opacity: 0.1,
  };
  countyValue =
    this.props.counties[
      this.props.counties.findIndex(
        (v) => v.region === this.props.selectedRegion
      )
    ].counties;
  regionValue =
    this.props.counties[
      this.props.counties.findIndex(
        (v) => v.region === this.props.selectedRegion
      )
    ].region;
  colorValue =
    this.props.counties[
      this.props.counties.findIndex(
        (v) => v.region === this.props.selectedRegion
      )
    ].color;
  colorValueString = `rgba(${this.colorValue.r}, ${this.colorValue.g}, ${this.colorValue.b}, ${this.colorValue.a})`;
  handleClick = (event: any, countyName: any) => {
    if (
      this.props.counties[
        this.props.counties.findIndex(
          (v) => v.region === this.props.selectedRegion
        )
      ].counties.includes(countyName)
    ) {
      event.target.setStyle({ fillColor: "white", fillOpacity: 0.1 });
    } else {
      event.target.setStyle({
        fillColor: this.colorValueString,
        fillOpacity: 0.4,
      });
    }
    this.props.handleChangeClick(countyName);
  };

  eachCounty = (county: any, layer: any) => {
    const countyName = county.properties.NAME;
    layer.bindPopup(countyName);
    layer.id = county.properties.GEO_ID;
    if (this.regionValue === "Unselected") {
      var arrayValues: any = [];
      this.props.counties.map(
        (c) => (arrayValues = arrayValues.concat(c.counties))
      );
      if (!arrayValues.includes(countyName)) {
        layer.setStyle({ fillColor: this.colorValueString, fillOpacity: 0.4 });
      }
    } else {
      if (this.countyValue.includes(countyName)) {
        layer.setStyle({ fillColor: this.colorValueString, fillOpacity: 0.4 });
      }
    }
    layer.on({
      click: (event: any) => this.handleClick(event, countyName),
    });
  };
  render() {
    return (
      <MapContainer center={[38, -120]} zoom={4} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON
          data={counties.features as any}
          style={this.countryStyle}
          onEachFeature={this.eachCounty}
        />
      </MapContainer>
    );
  }
}

export default Map;
