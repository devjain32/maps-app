import React from "react";
import "../App.css";
import { Box, Button, Checkbox } from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import AddCircle from "@mui/icons-material/AddCircle";
import ColorPickerRegion from "./ColorPickerRegion";

interface SelectionBoxProps {
  distance: number;
  regions: string[];
  handleChangeRegionClick: any;
  handleAddRegion: any;
  selectedRegion: string;
  handleColorChange: any;
  handleDeleteRegion: any;
}

interface SelectionBoxState {
  displayColorPicker: boolean;
  color: { r: string; g: string; b: string; a: string };
}

class SelectionBox extends React.Component<
  SelectionBoxProps,
  SelectionBoxState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: {
        r: "241",
        g: "112",
        b: "19",
        a: "1",
      },
    };
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: any) => {
    this.setState({ color: color.rgb });
  };

  render() {
    return (
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
        <div
          style={{
            backgroundColor: "white",
            marginBottom: 7,
            borderRadius: 3,
            padding: 1,
          }}
        >
          <Checkbox
            icon={<AddCircleOutline sx={{ color: "white" }} />}
            checkedIcon={<AddCircle sx={{ color: "white" }} />}
            disabled={true}
          />
          <Button
            sx={{
              width: "80%",
              backgroundColor: "white",
            }}
            disableElevation
            onClick={() => this.props.handleAddRegion()}
          >
            <div>Add region</div>
          </Button>
        </div>
        {this.props.regions.map((region) => (
          <div
            key={region}
            style={{
              backgroundColor: "white",
              marginBottom: 7,
              borderRadius: 3,
              padding: 1,
            }}
          >
            <ColorPickerRegion region={region} {...this.props} />
          </div>
        ))}
      </Box>
    );
  }
}

export default SelectionBox;
