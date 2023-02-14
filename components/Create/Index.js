import React from "react";
import styles from "./Index.module.css";
import { Web3Storage } from "web3.storage";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import { ethers } from "ethers";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Create() {
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIyOTMzRDhDM2Y5MzkyRjI2MDNjZDZiQUFBZTczRjJhNjNCRjcxYjEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3OTk3MjYxOTEsIm5hbWUiOiJBZCBzZXJ2ZXIifQ.bGUQJrYJIA4ugMI_gPUQxHMLPTFuCs0xgkgFK-kBaXw";

  const client = new Web3Storage({ token: API_TOKEN });

  const [file, setFile] = useState([]);
  const Server_ABI = process.env.Server_Contract_ABI;
  const Server_Address = process.env.Server_Contract_Address;

  const [filename, setFilename] = useState([]);

  const [allfile, setAllfile] = useState({});

  const [uploadStatus, setUploadStatus] = useState(false);

  const clickReward = useRef();
  const displayReward = useRef();
  const totalFunds = useRef();
  const AdName = useRef();

  const [open, setOpen] = useState(false);

  const getEthereumObject = () => window.ethereum;

  const [ethAccount, setEthAccount] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const warning = document.getElementsByClassName("warning");

    const getUser = async () => {
      const ethereum = getEthereumObject();
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const account = accounts[0];
      if (account !== null) {
        setEthAccount(account);
      } else {
        setEthAccount(null);
      }
    };
    getUser();

    const closePopUp = (e) => {
      if (e.target.id != "alert") {
        handleClose();
        console.log(e);
      }
    };

    document.body.addEventListener("click", closePopUp);
  }, [ethAccount]);

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "rgb(200,155,123)",
    },
    "& label": {
      color: "rgb(228,200,208)",
    },
    "& placeholder": {
      color: "rgb(215,173,184)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(200,155,123)",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgb(228,200,208)",
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const forloop = useCallback(() => {
    let temp = [];
    for (let i = 0; i < allfile.length; i++) {
      temp.push(allfile[i].name);
    }
    setFilename(temp);
  }, [allfile]);

  useEffect(() => {
    forloop();
  }, [allfile]);

  const handleUpload = async () => {
    var fileInput = ipfs_file;

    if (filename.length > 0) {
      setUploadStatus(true);

      const rootCid = await client.put(fileInput.files, {
        name: "Advertisement banner",
      });

      const res = await client.get(rootCid);
      const files = await res.files();

      setUploadStatus(false);

      let temp = [];
      for (let i = 0; i < files.length; i++) {
        temp.push(URL.createObjectURL(files[i]));
      }

      setFile(temp);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Server_Address, Server_ABI, signer);
      let uri = `https://ipfs.io/ipfs/${rootCid}`;
      const tx = await contract.createAd(uri, totalFunds);
      const receipt = await tx.wait();
      console.log(receipt);
    }
  };

  function uploadFile() {
    document.getElementById("ipfs_file").click();
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <CssTextField
                id="standard-basic"
                variant="standard"
                ref={AdName}
                placeholder="name of your ad campaign"
                type="text"
                label="Ad Campaign Name"
                required
                fullWidth
              />
              <Tooltip title="Name of your ad campaign">
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
            {/* <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <CssTextField
                                id="standard-basic"
                                variant="standard"
                                ref={clickReward}
                                placeholder="Reward you want to give for clicking on Ad"
                                type="number"
                                label="Reward for Clicks on Ad (ETH)"
                                required
                                fullWidth
                            />
                            <Tooltip title="Reward you want to give for clicking on Ad">
                                <InfoOutlinedIcon />
                            </Tooltip>

                        </div>
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <CssTextField
                                id="standard-basic"
                                // label="Outlined"
                                variant="standard"
                                ref={displayReward}
                                placeholder="Reward you want to give for displaying Ad"
                                type="number"
                                label="Reward for Displaying Ad (ETH)"
                                required
                                fullWidth
                            />
                            <Tooltip title="Reward you want to give for displaying Ad">
                                <InfoOutlinedIcon />
                            </Tooltip>
                        </div> */}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <CssTextField
                id="standard-basic"
                // label="Outlined"
                variant="standard"
                ref={totalFunds}
                placeholder="Total Fund for Campaign"
                type="number"
                label="Total Funds (ETH)"
                required
                fullWidth
              />
              <Tooltip title="Total Fund for Campaign">
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
            <div className={styles.uploadFile}>
              <div className={styles.text}>Upload Files</div>
              {allfile.length > 0 && (
                <div className={styles.text}>
                  {allfile.length} files choosen
                </div>
              )}
              <input
                id="ipfs_file"
                type="file"
                style={{ display: "none" }}
                onChange={() => {
                  setAllfile(ipfs_file.files);
                }}
              />
              {uploadStatus == false ? (
                <button
                  className={styles.button}
                  type="button"
                  onClick={uploadFile}
                >
                  choose files
                </button>
              ) : (
                <CircularProgress color="inherit" />
              )}
              {ethAccount != null ? (
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleUpload}
                >
                  Submit
                </button>
              ) : (
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleClickOpen}
                  id="alert"
                >
                  Submit
                </button>
              )}
            </div>
            {open ? (
              <Alert severity="warning" className="warning" id="alert">
                <AlertTitle>Warning</AlertTitle>
                Wallet is not connected — <strong>Connect Wallet</strong>
              </Alert>
            ) : (
              <></>
            )}
            <div className={styles.choosenfile}>
              {filename.length > 0 && (
                <div
                  className={styles.text}
                  style={{ textDecoration: "underline" }}
                >
                  Selected file
                </div>
              )}
              <div>
                {filename.length > 0 &&
                  filename.map((file, idx) => {
                    return (
                      <div className={styles.filename}>
                        <div className={styles.text} key={idx}>
                          {file}
                        </div>
                        {/* <RemoveCircleOutlineOutlinedIcon style={{ fontSize: "medium" }} /> */}
                      </div>
                    );
                  })}
              </div>
            </div>
            {file.length > 0 && (
              <div
                className={styles.text}
                style={{ textDecoration: "underline" }}
              >
                Uploaded file
              </div>
            )}
            <div className={styles.imageContainer}>
              {file.map((fileUrl) => {
                return <img alt="ad images" src={fileUrl} />;
              })}
            </div>
          </form>
        </div>
      </div>
      <div className={styles.textContainer}>
        Create <br></br>
        Your Ad <br></br>
        Campaign
      </div>
    </div>
  );
}
