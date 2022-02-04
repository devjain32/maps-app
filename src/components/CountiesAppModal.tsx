import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface CountiesAppModalProps {
  selectedCounty: string;
  selectedRegion: string;
  counties: { region: string; color: any; counties: string[] }[];
  handleClose: any;
  deleteCountyFromRegion: any;
  addCountyToRegion: any;
  open: boolean;
}

interface CountiesAppModalState {}

class CountiesAppModal extends React.Component<
  CountiesAppModalProps,
  CountiesAppModalState
> {
  numberOccurrences = () => {
    var regions = this.props.counties.filter(
      (c) => c.region !== this.props.selectedRegion
    );
    var regionsContained: string[] = [];
    regions.map((r) => {
      if (r.counties.includes(this.props.selectedCounty)) {
        regionsContained.push(r.region);
      }
    });
    var regionsNotContained: string[] = [];
    regions.map((r) => {
      if (!r.counties.includes(this.props.selectedCounty)) {
        regionsNotContained.push(r.region);
      }
    });
    regionsNotContained = regionsNotContained.filter(
      (r: string) => r !== "Unselected"
    );

    return (
      <>
        <div style={{ fontSize: 15 }}>
          {this.props.selectedCounty} exists in {regionsContained.length} other
          region
          {regionsContained.length === 1 ? "." : "s."}
        </div>
        {regionsContained.length !== 0 && (
          <>
            <div style={{ color: "brown" }}>Delete from:</div>
            <div>
              {regionsContained.map((r) => (
                <Button
                  key={r}
                  style={{ color: "brown" }}
                  onClick={() => {
                    this.props.deleteCountyFromRegion(
                      r,
                      this.props.selectedCounty,
                      false
                    );
                  }}
                >
                  {r}
                </Button>
              ))}
            </div>
          </>
        )}
        {regionsNotContained.length !== 0 && (
          <>
            <div style={{ color: "white" }}>Add to:</div>
            <div>
              {regionsNotContained.map((r) => (
                <Button
                  key={r}
                  style={{ color: "white" }}
                  onClick={() =>
                    this.props.addCountyToRegion(r, this.props.selectedCounty)
                  }
                >
                  {r}
                </Button>
              ))}
            </div>
          </>
        )}
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

export default CountiesAppModal;
