import React from "react";
import { Button, Checkbox, IconButton } from "@mui/material";
import { SketchPicker } from "react-color";
import DeleteIcon from "@mui/icons-material/Delete";
import Palette from "@mui/icons-material/Palette";

interface ColorPickerRegionProps {
  handleChangeRegionClick: any;
  region: string;
  handleColorChange: any;
  handleDeleteRegion: any;
  selectedRegion: string;
}

interface ColorPickerRegionState {
  displayColorPicker: boolean;
  color: any;
  checkboxOpen: boolean;
}

class ColorPickerRegion extends React.Component<
  ColorPickerRegionProps,
  ColorPickerRegionState
> {
  state = {
    displayColorPicker: false,
    color: {
      r: 241,
      g: 112,
      b: 19,
      a: 1,
    },
    checkboxOpen: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
    this.props.handleColorChange(this.state.color, this.props.region);
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
    this.props.handleColorChange(this.state.color, this.props.region);
  };

  handleChange = (color: any) => {
    this.setState({ color: color.rgb });
  };

  handleChangeCheckbox = (event: any) => {
    this.setState({ checkboxOpen: event.target.checked });
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  render() {
    const styles = {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
    };
    return (
      <>
        <Checkbox
          onChange={this.handleChangeCheckbox}
          icon={
            <Palette
              sx={{
                color: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
              }}
            />
          }
          checkedIcon={
            <Palette
              sx={{
                color: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
              }}
            />
          }
        />
        <IconButton
          disabled={this.props.region === "Unselected" ? true : false}
          onClick={() => this.props.handleDeleteRegion(this.props.region)}
        >
          <DeleteIcon />
        </IconButton>
        <Button
          sx={{
            width: "60%",
            backgroundColor: "white",
          }}
          disableElevation
          onClick={() => this.props.handleChangeRegionClick(this.props.region)}
        >
          <div
            style={{
              fontWeight:
                this.props.selectedRegion === this.props.region
                  ? "bolder"
                  : "lighter",
            }}
          >
            {this.props.region}
          </div>
        </Button>
        {this.state.displayColorPicker ? (
          <div
            style={{
              position: "absolute",
              zIndex: "2",
            }}
          >
            <div
              style={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
              }}
              onClick={this.handleClose}
            />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default ColorPickerRegion;
