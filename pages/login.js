import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "/components/Create/Index.module.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useAccount } from "wagmi";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "rgb(200,155,123)",
  },
  "& label": {
    color: "rgba(10, 16, 13, 0.7)",
  },
  "& placeholder": {
    color: "rgb(215,173,184)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(200,155,123)",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "rgba(10, 16, 13, 0.7)",
  },
});

const Login = () => {
  const [open, setOpen] = useState(false);

  const [connected, setConnected] = useState(false);

  const { address } = useAccount();
  const [PublisherSite, setPublisherSite] = useState("");
  const [PublisherEmail, setPublisherEmail] = useState("");
  const [PublisherClickCharge, setPublisherClickCharge] = useState("");
  const [PublisherAdCharge, setPublisherAdCharge] = useState("");

  useEffect(() => {
    if (address != undefined) {
      setConnected(true);
      console.log(address);
    } else {
      setConnected(false);
    }
  }, [address]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(PublisherSite);
    console.log(PublisherEmail);
    console.log(PublisherClickCharge);
    console.log(PublisherAdCharge);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: "70px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
          width: "100%",
        }}
      >
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Become Publisher</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Become the Publisher, enter the required details. We will send
              updates occasionally.
            </DialogContentText>
            <CssTextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setPublisherEmail(event.target.value);
              }}
            />
            <CssTextField
              autoFocus
              margin="dense"
              id="name"
              label="Charge for Click on Reward(in ETH)"
              type="number"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setPublisherClickCharge(event.target.value);
              }}
            />
            <CssTextField
              autoFocus
              margin="dense"
              id="name"
              label="Charge for displaying Advertisement(in ETH)"
              type="number"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setPublisherAdCharge(event.target.value);
              }}
            />
            <CssTextField
              autoFocus
              margin="dense"
              id="name"
              label="Website URL"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setPublisherSite(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Proceed</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div className={styles.heading}>Welcome to AdChain</div>
        {connected ? (
          <></>
        ) : (
          <div className={styles.info}>Connect your wallet to login</div>
        )}
        <ConnectButton />
        {connected ? (
          <button className={styles.button2} onClick={handleClickOpen}>
            Become Ad Publisher
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Login;
