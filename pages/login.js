import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "/components/Create/Index.module.css"
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAccount } from "wagmi";

const Login = () => {

  const [open, setOpen] = useState(false);

  const [connected, setConnected] = useState(false)

  const { address } = useAccount()

  useEffect(() => {
    if (address != undefined) {
      setConnected(true)
      console.log(address)
    } else {
      setConnected(false)
    }

  }, [address])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'rgb(200,155,123)',
    },
    '& label': {
      color: 'rgba(10, 16, 13, 0.7)',
    },
    '& placeholder': {
      color: 'rgb(215,173,184)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(200,155,123)',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'rgba(10, 16, 13, 0.7)',
    },
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", gap: "70px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px", width: "100%" }}>
        {connected
          ? <button className={styles.button2} onClick={handleClickOpen}>Become Ad Publisher</button>
          : <></>
        }
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Become Publisher</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Become the Publisher, enter the required details. We
              will send updates occasionally.
            </DialogContentText>
            <CssTextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <CssTextField
              autoFocus
              margin="dense"
              id="name"
              label="Charge for Click on Reward"
              type="email"
              fullWidth
              variant="standard"
            />
            <CssTextField
              autoFocus
              margin="dense"
              id="name"
              label="Charge for displaying Advertisement"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Proceed</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", gap: "24px" }}>
        <div className={styles.heading}>Welcome to AdChain</div>
        <div className={styles.info}>Connect your wallet to login</div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Login;