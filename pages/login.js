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
import axios from "axios";

import { useAccount } from "wagmi";
import { ethers } from "ethers";

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
  const SUBGRAPH = process.env.NEXT_PUBLIC_SubGraph_URL;

  const [connected, setConnected] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);

  const { address } = useAccount();
  const [PublisherSite, setPublisherSite] = useState("");
  const [PublisherClickCharge, setPublisherClickCharge] = useState("");
  const [PublisherAdCharge, setPublisherAdCharge] = useState("");
  const [PublisherEarnings, setPublisherEarnings] = useState("");
  const [PublisherTotalViews, setPublisherTotalViews] = useState("");
  const [PublisherTotalClicks, setPublisherTotalClicks] = useState("");
  const [PublishersAds, setPublishersAds] = useState([]);

  const Server_ABI = process.env.NEXT_PUBLIC_Server_ABI;
  const Server_Address = process.env.NEXT_PUBLIC_Server_ADDRESS;

  useEffect(() => {
    if (address != undefined) {
      setConnected(true);
    } else {
      setConnected(false);
    }

    async function getPublisher() {
      const query = `{
  publishers(first: 5 where:{Publisher:"${address}"}) {
    PublisherId
    TotalEarnings
    TotalClicks
    PublisherSite
    TotalViews
    ViewReward
    ClickReward
    Advertisers
  }
}`;
      const response = await axios.post(SUBGRAPH, { query: query });
      const data = response.data.data.publishers[0];
      if (data != undefined) {
        setIsPublisher(true);
        setPublisherEarnings(data.TotalEarnings);
        setPublisherTotalViews(data.TotalViews);
        setPublisherTotalClicks(data.TotalClicks);
        setPublisherSite(data.PublisherSite);
        setPublisherClickCharge(data.ClickReward);
        setPublisherAdCharge(data.ViewReward);
        setPublishersAds(data.Advertisers);
      } else {
        setIsPublisher(false);
      }
    }
    const publishers = getPublisher();
  }, [address]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = async () => {
    setOpen(false);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Server_Address, Server_ABI, signer);
      const tx = await contract.createPublisher(
        PublisherClickCharge,
        PublisherAdCharge,
        PublisherSite
      );
      const receipt = await tx.wait();
      setProcessing(false);
    } catch (err) {
      console.error(err);
    }
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
            <Button onClick={handleCancel}>Cancel</Button>
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
        {isPublisher ? (
          <></>
        ) : (
          <button className={styles.button2} onClick={handleClickOpen}>
            Become Ad Publisher
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
