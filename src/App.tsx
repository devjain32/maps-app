import React from "react";
import "./App.css";
import Map from "./components/Map";
import SelectionBox from "./components/SelectionBox";
import SelectionBoxCounties from "./components/SelectionBoxCounties";
import SelectionBoxUnselected from "./components/SelectionBoxUnselected";
import HelpMenu from "./components/HelpMenu";
import {
  getAllRegions,
  toggleCounty,
  addRegion,
  changeRegionName,
  changeColor,
  deleteCounty,
  deleteManyCounties,
  addToRegion,
  deleteRegion,
} from "./config/utility";
import data from "./config/data";

interface AppProps {}

interface AppState {
  counties: {
    region: string;
    color: { r: number; g: number; b: number; a: number };
    counties: string[];
  }[];
  selectedRegion: string;
  showUnselected: boolean;
  regionName: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      counties: data,
      selectedRegion: data[1].region,
      showUnselected: false,
      regionName: "",
    };
  }
  handleChangeClick = (county: string) => {
    this.setState({
      counties: toggleCounty(
        this.state.counties,
        county,
        this.state.selectedRegion
      ),
    });
  };
  listRegions = () => {
    return getAllRegions(this.state.counties);
  };
  addRegion = () => {
    this.setState({ counties: addRegion(this.state.counties) });
  };
  handleChangeRegion = (region: string) => {
    this.setState({ selectedRegion: region });
  };
  handleChangeRegionName = (name: string) => {
    var counties = changeRegionName(
      this.state.counties,
      this.state.selectedRegion,
      name
    );
    if (counties !== undefined) {
      this.setState({
        counties,
        selectedRegion: name,
      });
    }
  };
  handleColorChange = (color: any, region: string) => {
    this.setState({
      counties: changeColor(this.state.counties, region, color),
    });
  };
  deleteCountyFromRegion = (r: string, county: string) => {
    this.setState({ counties: deleteCounty(this.state.counties, r, county) });
  };
  removeCountiesFromRegion = (counties: string[]) => {
    this.setState({
      counties: deleteManyCounties(
        this.state.counties,
        counties,
        this.state.selectedRegion
      ),
    });
    var region = this.state.regionName;
    if (region === "") {
      region = "b";
    } else {
      region = "";
    }
    this.setState({ regionName: region });
  };
  addCountyToRegion = (region: string, county: string, status: boolean) => {
    this.setState({
      counties: addToRegion(this.state.counties, region, county),
    });
    if (status) {
      this.setState({ selectedRegion: region });
    }
  };
  handleDeleteRegion = (region: string) => {
    this.setState({
      counties: deleteRegion(this.state.counties, region),
      selectedRegion: "Unselected",
    });
  };
  render() {
    return (
      <div>
        <SelectionBox
          regions={this.listRegions() as string[]}
          distance={2}
          handleChangeRegionClick={this.handleChangeRegion}
          handleAddRegion={this.addRegion}
          selectedRegion={this.state.selectedRegion}
          handleColorChange={this.handleColorChange}
          handleDeleteRegion={this.handleDeleteRegion}
        />
        {!(this.state.selectedRegion === "Unselected") && (
          <SelectionBoxCounties
            handleChangeRegionName={this.handleChangeRegionName}
            counties={this.state.counties}
            distance={40}
            handleChangeClick={this.handleChangeClick}
            showUnselected={this.state.showUnselected}
            selectedRegion={this.state.selectedRegion}
            deleteCountyFromRegion={this.deleteCountyFromRegion}
            removeCountiesFromRegion={this.removeCountiesFromRegion}
            addCountyToRegion={this.addCountyToRegion}
          />
        )}
        {this.state.selectedRegion === "Unselected" && (
          <SelectionBoxUnselected
            handleChangeRegionName={this.handleChangeRegionName}
            counties={this.state.counties}
            distance={40}
            handleChangeClick={this.handleChangeClick}
            showUnselected={this.state.showUnselected}
            selectedRegion={this.state.selectedRegion}
            addCountyToRegion={this.addCountyToRegion}
            removeCountiesFromRegion={this.removeCountiesFromRegion}
          />
        )}
        <Map
          key={
            this.state.selectedRegion +
            this.state.counties[
              this.state.counties.findIndex(
                (v) => v.region === this.state.selectedRegion
              )
            ].color.r +
            this.state.regionName
          }
          counties={this.state.counties}
          handleChangeClick={this.handleChangeClick}
          selectedRegion={this.state.selectedRegion}
        />
        <HelpMenu />
      </div>
    );
  }
}

export default App;
