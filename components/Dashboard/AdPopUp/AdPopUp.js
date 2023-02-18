import { useEffect, useState, useCallback } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styles from "./AdPopUp.module.css";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Contract, providers, ethers } from "ethers";
import { useAccount } from "wagmi";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import Link from "next/link";

const Contract_Address = process.env.NEXT_PUBLIC_Server_ADDRESS;
const Contract_ABI = process.env.NEXT_PUBLIC_Server_ABI;

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    color: "#C89B7B",
  },
  "& .MuiInputBase-input": {
    position: "relative",
    borderBottom: "1px solid #ced4da",
    borderColor: "#C89B7B",
    fontSize: 20,
    padding: "12px 12px 2px 12px",
    color: "#C89B7B",
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderColor: "#C89B7B",
      color: "#C89B7B",
    },
  },
}));

const AdDetails = (props) => {
  console.log(props);

  const [TotalFunds, setTotalFunds] = useState();
  const [currentFunds, setCurrentFunds] = useState();
  const [EthAccount, setEthAccount] = useState();
  const [connected, setConnected] = useState(false);
  const [publisherData, setPublisherData] = useState([]);
  const [adsPublisherData, setAdsPublisherData] = useState([]);
  const [availblePublisher, setAvailblePublisher] = useState();
  const [addedPublisher, setAddedPublisher] = useState();
  const [sunscribe, setSunscribe] = useState(true);

  const { address } = useAccount();
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const closePopUp = (e) => {
      if (e.target.id == "background") {
        props.closeHandler(false);
      }
    };
    if (address != undefined) {
      setEthAccount(address);
    } else {
      return <h1>try connecting First</h1>;
    }
    document.body.addEventListener("click", closePopUp);

    if (address != undefined) {
      setConnected(true);
      setEthAccount(address);
    }

    setCurrentFunds(ethers.utils.formatEther(props.data.CurrentFunds));
    setTotalFunds(ethers.utils.formatEther(props.data.TotalFunds));

    return () => document.body.removeEventListener("click", closePopUp);
  });

  const onClickHandler = (e) => {
    props.closeHandler(false);
  };

  const initilizeloop = useCallback(() => {
    const tempChoicesArray = [];
    for (let i = 0; i < props.publisher.length; i++) {
      let obj = {};
      obj["publisherId"] = props.publisher[i].PublisherId;
      obj["publisherSite"] = props.publisher[i].PublisherSite;
      obj["publisherAddress"] = props.publisher[i].Publisher;
      tempChoicesArray.push(obj);
    }
    setPublisherData(tempChoicesArray);
  }, [props]);

  const initilizeloop2 = useCallback(() => {
    const tempChoicesArray = [];
    for (let i = 0; i < props.data.Publishers.length; i++) {
      let obj = {};
      let id = props.data.Publishers[i];
      for (let i = 0; i < publisherData.length; i++) {
        if (publisherData[i].publisherId == id) {
          obj["adPublisherId"] = id;
          obj["adPublisherAddress"] = publisherData[i].publisherAddress;
          obj["adPublisherSite"] = publisherData[i].publisherSite;
        }
      }
      tempChoicesArray.push(obj);
    }
    setAdsPublisherData(tempChoicesArray);
    setRunning(props.data.isRunning);
  }, [props, publisherData]);

  useEffect(() => {
    initilizeloop();
  }, [props]);

  useEffect(() => {
    initilizeloop2();
  }, [props, publisherData]);
  const getContract = async () => {
    const provider = await new providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await new Contract(Contract_Address, Contract_ABI, signer);
    return contract;
  };
  const handleStartCampaign = async () => {
    try {
      const contract = await getContract();
      const result = await contract.startCampaign(props.data.AdId);
      result.wait().then(() => {
        setRunning(true);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleStopCampaign = async () => {
    try {
      const contract = await getContract();
      const result = await contract.stopCampaign(props.data.AdId);
      result.wait().then(() => {
        setRunning(false);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddFunds = async () => {
    try {
      const contract = await getContract();
      const result = await contract.addFundsToCampaign(
        props.data.AdId,
        ethers.utils.parseEther("10")
      );
      result.wait().then(() => {
        let temp = currentFunds + 10;
        setCurrentFunds(temp);
        let temp2 = TotalFunds + 10;
        setTotalFunds(temp2);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleWithdrawFunds = async () => {
    try {
      const contract = await getContract();
      const result = await contract.removeFundsFromCampaign(
        props.data.AdId,
        ethers.utils.parseEther("10")
      );
      result.wait().then(() => {
        let temp = currentFunds - 10;
        setCurrentFunds(temp);
        let temp2 = TotalFunds - 10;
        setTotalFunds(temp2);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddPublisher = async () => {
    if (addedPublisher != undefined) {
      try {
        const contract = await getContract();
        const result = await contract.SubscribetoPublisher(
          props.data.AdId,
          addedPublisher
        );
        result.wait().then(() => {
          console.log("done");
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please Select Publisher");
    }
  };
  const handleRemovePublisher = async () => {
    try {
      const contract = await getContract();
      const result = await contract.UnSubscribetoPublisher(
        props.data.AdId,
        addedPublisher
      );
      result.wait().then(() => {
        console.log("done");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="background" className={styles.popUp}>
      <div className={styles.popUpInner}>
        <CloseRoundedIcon className={styles.close} onClick={onClickHandler} />
        <div className={styles.adImage}>
          <img src={props.data.ImgLink} alt="ad image" />
          <div>{props.data.name}</div>
          <div>{props.data.Description}</div>
          <div>
            <p></p>
            TotalViews:
            {props.data.TotalViews}
          </div>
          <div>
            TotalClicks:
            {props.data.TotalClicks}
          </div>
          <Link href="">
            <div className={styles.link}>
              linked website <OpenInNewRoundedIcon />
            </div>
          </Link>
        </div>
        <div>
          <div className={styles.control}>
            {running && (
              <button
                className={styles.button}
                type="button"
                onClick={handleStopCampaign}
              >
                <StopCircleOutlinedIcon /> Stop Campaign
              </button>
            )}
            {!running && (
              <button
                className={styles.button}
                type="button"
                onClick={handleStartCampaign}
              >
                <PlayArrowOutlinedIcon /> Start Campaign
              </button>
            )}
          </div>
          <div className={styles.fundsDisplay}>
            <div>
              <div>Total Funds </div>
              <h3>{TotalFunds} ADT</h3>
            </div>
            <div>
              <div>Current Funds</div>
              <h3>{currentFunds} ADT</h3>
              <div>
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddFunds}
                >
                  Add Funds
                </button>
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleWithdrawFunds}
                >
                  Decrese Funds
                </button>
              </div>
            </div>
          </div>
          <div className={styles.publisher}>
            <div>
              {sunscribe ? (
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddPublisher}
                >
                  <StopCircleOutlinedIcon /> Add Publisher
                </button>
              ) : (
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleRemovePublisher}
                >
                  <PlayArrowOutlinedIcon /> Remove Publisher
                </button>
              )}
            </div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Added Publishers
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={addedPublisher}
                onChange={(e) => {
                  setAddedPublisher(e.target.value);
                  setSunscribe(false);
                }}
                input={<BootstrapInput />}
                label="Publisher"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {adsPublisherData.map((data, index) => {
                  return (
                    <MenuItem value={data.adPublisherAddress} key={index}>
                      {data.adPublisherSite}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Availble Publishers
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={availblePublisher}
                onChange={(event) => {
                  setAvailblePublisher(event.target.value);
                  setSunscribe(true);
                }}
                input={<BootstrapInput />}
                label="Publisher"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {publisherData.map((data, index) => {
                  return (
                    <MenuItem value={data.publisherAddress} key={index}>
                      {data.publisherSite}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
