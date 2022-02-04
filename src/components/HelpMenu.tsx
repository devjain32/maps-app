import React from "react";
import { Button, IconButton, Modal, Box, Typography } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

interface HelpMenuProps {}

interface HelpMenuState {
  open: boolean;
}

class HelpMenu extends React.Component<HelpMenuProps, HelpMenuState> {
  state = { open: false };
  render() {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      backgroundColor: "#131112",
      boxShadow: "inset 0 0 150px rgba(170, 211, 223, .3)",
      borderRadius: 5,
      padding: 2,
      color: "white",
    };
    return (
      <>
        <IconButton
          sx={{
            position: "absolute",
            top: "95%",
            left: "97%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            backgroundColor: "#131112",
            boxShadow: "inset 0 0 150px rgba(170, 211, 223, .3)",
          }}
          onClick={() => this.setState({ open: true })}
        >
          <QuestionMarkIcon style={{ color: "white" }} />
        </IconButton>
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Map App by Dev Jain
            </Typography>
            <div style={{ marginTop: 2 }}>
              <ul>
                <li>Select multiple counties and save them as a region</li>
                <li>View each region</li>
                <li>
                  View unselected counties and designate them to a given region
                </li>
                <li>Change color on map for different regions</li>
                <li>
                  Add and remove counties from regions depending on status
                </li>
              </ul>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Github
            </Typography>
          </Box>
        </Modal>
      </>
    );
  }
}

export default HelpMenu;
