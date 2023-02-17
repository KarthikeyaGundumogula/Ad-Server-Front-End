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

export default function Create() {
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIyOTMzRDhDM2Y5MzkyRjI2MDNjZDZiQUFBZTczRjJhNjNCRjcxYjEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3OTk3MjYxOTEsIm5hbWUiOiJBZCBzZXJ2ZXIifQ.bGUQJrYJIA4ugMI_gPUQxHMLPTFuCs0xgkgFK-kBaXw";

  const client = new Web3Storage({ token: API_TOKEN });

  const [file, setFile] = useState([]);
  const Server_ABI = process.env.NEXT_PUBLIC_Server_ABI;
  const Server_Address = process.env.NEXT_PUBLIC_Server_ADDRESS;

  const [filename, setFilename] = useState([]);

  const [allfile, setAllfile] = useState({});

  const [uploadStatus, setUploadStatus] = useState(false);

  // const clickReward = useRef();
  const [adDescription, setAdDescription] = useState();
  const [totalFunds, setTotalfunds] = useState();
  const [AdName, setAdName] = useState();
  const [Processed, setProcessed] = useState(false);

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
      }
    };

    document.body.addEventListener("click", closePopUp);
  }, [ethAccount]);

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

      const rootCid = await client.put(fileInput.files);

      const res = await client.get(rootCid);
      const files = await res.files();

      setUploadStatus(false);

      let temp = [];
      for (let i = 0; i < files.length; i++) {
        temp.push(URL.createObjectURL(files[i]));
      }

      setFile(temp);
      const AdMetaData = {
        name: AdName,
        Description: adDescription,
        totalFunds: totalFunds,
        Address: ethAccount,
        ImgLink: "https://" + rootCid + ".ipfs.w3s.link" + "/" + filename[0],
      };
      const blob = new Blob([JSON.stringify(AdMetaData)], {
        type: "application/json",
      });

      const MetaDataFile = [
        new File(["contents-of-file-1"], "plain-utf8.txt"),
        new File([blob], "AdMetaData.json"),
      ];

      const MetaDataCID = await client.put(MetaDataFile);
      console.log(MetaDataCID);
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await new ethers.Contract(
        Server_Address,
        Server_ABI,
        signer
      );
      let URI =
        "https://" + MetaDataCID + ".ipfs.w3s.link" + "/AdMetaData.json";

      let funds = BigInt(totalFunds);
      const tx = await contract.createAd(URI, funds);
      await tx.wait();
      if (tx) {
        console.log(Processed);
      }
    }
  };

  function uploadFile() {
    document.getElementById("ipfs_file").click();
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer}>
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <CssTextField
                id="standard-basic"
                variant="standard"
                value={AdName}
                onChange={(e) => {
                  setAdName(e.target.value);
                }}
                placeholder="name of your ad campaign"
                type="text"
                label="Name"
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

                        </div>*/}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <CssTextField
                id="standard-basic"
                // label="Outlined"
                variant="standard"
                value={adDescription}
                onChange={(e) => {
                  setAdDescription(e.target.value);
                }}
                placeholder="Description about your ad campaign"
                type="text"
                label="Description"
                required
                fullWidth
              />
              <Tooltip title="Description of the advertisement">
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <CssTextField
                id="standard-basic"
                variant="standard"
                value={totalFunds}
                onChange={(e) => {
                  setTotalfunds(e.target.value);
                }}
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
              {ethAccount != null ?
                (uploadStatus != true
                  ? <button
                    className={styles.button}
                    type="button"
                    onClick={handleUpload}
                  >
                    Submit
                  </button>
                  : <div></div>
                )
                :
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleClickOpen}
                  id="alert"
                >
                  Submit
                </button>
              }
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
          </div>
        </div>
      </div>
      <div className={styles.textContainer}>
        Create <br></br>
        Your Ad <br></br>
        Campaign
      </div>
    </div >
  );
}
