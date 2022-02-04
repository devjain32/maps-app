import React from "react";
import "../App.css";
import { Box, Button, TextField, Modal, Typography } from "@mui/material";
import counties from "../counties/us-counties-list.json";
import AppModal from "./AppModal";

interface SelectionBoxUnselectedProps {
  distance: number;
  counties: { region: string; color: any; counties: string[] }[];
  handleChangeClick: any;
  handleChangeRegionName: any;
  showUnselected: boolean;
  selectedRegion: string;
  addCountyToRegion: any;
  removeCountiesFromRegion: any;
}

interface SelectionBoxUnselectedState {
  textValue: string;
  selectedDelete: string[];
  open: boolean;
  selectedCounty: string;
  checkedValues: string[];
  searchReturn: string[];
}

class SelectionBoxUnselected extends React.Component<
  SelectionBoxUnselectedProps,
  SelectionBoxUnselectedState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      textValue: "",
      selectedDelete: [],
      open: false,
      selectedCounty: "",
      checkedValues: [],
      searchReturn: [],
    };
  }
  componentDidMount = () => {
    var countiesArr = counties.counties;
    for (var i = 0; i < this.props.counties.length; i++) {
      if (this.props.counties[i].counties.length > 0) {
        this.props.counties[i].counties.map((c) => {
          var index = countiesArr.indexOf(c, 1);
          countiesArr.splice(index, 1);
        });
      }
    }
    this.setState({ searchReturn: countiesArr });
  };

  handleChangeChecked = (county: string) => {
    var checkedValues = this.state.checkedValues;
    if (this.state.checkedValues.includes(county)) {
      checkedValues.splice(checkedValues.indexOf(county), 1);
    } else {
      checkedValues.push(county);
    }
    this.setState({ checkedValues });
  };
  componentDidUpdate = (prevProps: any) => {
    if (prevProps.selectedRegion !== this.props.selectedRegion) {
      this.setState({ checkedValues: [] });
    }
  };

  searchReturn = () => {
    if (this.state.textValue.length < 3) {
      return [];
    } else {
      return this.state.searchReturn.filter((c) =>
        c.toLowerCase().includes(this.state.textValue.toLowerCase())
      );
    }
  };

  handleClose = () => {
    this.setState({ open: false, selectedCounty: "" });
  };

  render() {
    return (
      <>
        <Box
          sx={{
            zIndex: 2,
            position: "absolute",
            height: "auto",
            bottom: 0,
            top: 0,
            left: 0,
            marginTop: 2,
            marginBottom: 2,
            width: 250,
            marginLeft: this.props.distance,
            backgroundColor: "#131112",
            boxShadow: "inset 0 0 150px rgba(170, 211, 223, .3)",
            borderRadius: 5,
            padding: 2,
            color: "white",
            overflowY: "scroll",
          }}
          className="scrollBox"
        >
          <TextField
            variant="outlined"
            sx={{
              marginBottom: 1,
              backgroundColor: "white",
              borderRadius: 1,
              width: "100%",
            }}
            placeholder="Search counties..."
            onChange={(event) =>
              this.setState({ textValue: event.target.value })
            }
            value={this.state.textValue}
          />
          {this.state.textValue.length < 3 && (
            <Button
              sx={{
                width: "100%",
                backgroundColor: "white",
              }}
              disableElevation
              disabled={true}
            >
              <div>begin typing at least three letters to return search</div>
            </Button>
          )}
          {this.searchReturn().map((county) => (
            <div
              key={county + this.props.selectedRegion}
              style={{
                backgroundColor: "white",
                marginBottom: 7,
                borderRadius: 3,
                padding: 1,
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                }}
                disableElevation
                onClick={() => {
                  this.setState({ open: true, selectedCounty: county });
                }}
              >
                <div>{county}</div>
              </Button>
            </div>
          ))}
        </Box>
        <AppModal
          open={this.state.open}
          handleClose={this.handleClose}
          counties={this.props.counties}
          addCountyToRegion={this.props.addCountyToRegion}
          selectedCounty={this.state.selectedCounty}
        />
      </>
    );
  }
}

export default SelectionBoxUnselected;
