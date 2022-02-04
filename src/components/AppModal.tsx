import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface AppModalProps {
  handleClose: any;
  open: boolean;
  counties: { region: string; color: any; counties: string[] }[];
  selectedCounty: string;
  addCountyToRegion: any;
}

interface AppModalState {}

class AppModal extends React.Component<AppModalProps, AppModalState> {
  numberOccurrences = () => {
    var regions = this.props.counties
      .filter((c) => {
        if (c.region !== "Unselected") {
          return c.region;
        }
      })
      .map((c) => c.region);

    return (
      <>
        <>
          <div style={{ color: "white" }}>
            Click on any region you would like to add{" "}
            {this.props.selectedCounty} to:
          </div>
          <div>
            {regions.map((r) => (
              <Button
                key={r}
                style={{ color: "white" }}
                onClick={() =>
                  this.props.addCountyToRegion(
                    r,
                    this.props.selectedCounty,
                    true
                  )
                }
              >
                {r}
              </Button>
            ))}
          </div>
        </>
      </>
    );
  };
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "#000000",
            boxShadow: "inset 0 0 150px rgba(170, 211, 223, .3)",
            borderRadius: 5,
            padding: 2,
            color: "white",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {this.props.selectedCounty !== ""
              ? this.props.selectedCounty
              : null}
          </Typography>
          {this.props.selectedCounty !== "" ? this.numberOccurrences() : null}
        </Box>
      </Modal>
    );
  }
}

export default AppModal;
