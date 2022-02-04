import React from "react";
import "../App.css";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Checkbox,
  Modal,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Delete from "@mui/icons-material/Delete";
import CountiesAppModal from "./CountiesAppModal";

interface SelectionBoxCountiesProps {
  distance: number;
  counties: { region: string; color: any; counties: string[] }[];
  handleChangeClick: any;
  handleChangeRegionName: any;
  showUnselected: boolean;
  selectedRegion: string;
  deleteCountyFromRegion: any;
  removeCountiesFromRegion: any;
  addCountyToRegion: any;
}

interface SelectionBoxCountiesState {
  textValue: string;
  selectedDelete: string[];
  open: boolean;
  selectedCounty: string;
  checkedValues: string[];
}

class SelectionBoxCounties extends React.Component<
  SelectionBoxCountiesProps,
  SelectionBoxCountiesState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      textValue: "",
      selectedDelete: [],
      open: false,
      selectedCounty: "",
      checkedValues: [],
    };
  }

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
          {this.props.counties[
            this.props.counties.findIndex(
              (v) => v.region === this.props.selectedRegion
            )
          ].region !== "Unselected" && (
            <>
              <TextField
                variant="outlined"
                sx={{
                  marginBottom: 1,
                  backgroundColor: "white",
                  borderRadius: 1,
                }}
                placeholder={`Rename ${this.props.selectedRegion}`}
                onChange={(event) =>
                  this.setState({ textValue: event.target.value })
                }
                value={this.state.textValue}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      style={{ marginRight: -3 }}
                      onClick={() => {
                        this.props.handleChangeRegionName(this.state.textValue);
                        this.setState({ textValue: "" });
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  ),
                }}
              />
            </>
          )}
          {this.props.selectedRegion !== "Unselected" &&
            this.props.counties[
              this.props.counties.findIndex(
                (v) => v.region === this.props.selectedRegion
              )
            ].counties.map((county) => (
              <div
                key={county + this.props.selectedRegion}
                style={{
                  backgroundColor: "white",
                  marginBottom: 7,
                  borderRadius: 3,
                  padding: 1,
                }}
              >
                <Checkbox
                  icon={<DeleteOutline />}
                  checkedIcon={<Delete />}
                  onClick={() => this.handleChangeChecked(county)}
                />
                <Button
                  sx={{
                    width: "80%",
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
          {this.state.checkedValues.length > 0 && (
            <Button
              sx={{
                width: "100%",
                backgroundColor: "red",
              }}
              disableElevation
              onClick={() => {
                this.props.removeCountiesFromRegion(this.state.checkedValues);
                this.setState({ checkedValues: [] });
              }}
            >
              <div>Remove {this.state.checkedValues.length} from region</div>
            </Button>
          )}
        </Box>
        <CountiesAppModal
          counties={this.props.counties}
          selectedRegion={this.props.selectedRegion}
          selectedCounty={this.state.selectedCounty}
          deleteCountyFromRegion={this.props.deleteCountyFromRegion}
          addCountyToRegion={this.props.addCountyToRegion}
          open={this.state.open}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}

export default SelectionBoxCounties;
