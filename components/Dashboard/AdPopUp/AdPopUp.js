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
  console.log(props)

  const [campaign, setCampaign] = useState("");
  const [TotalFunds, setTotalFunds] = useState();
  const [currentFunds, setCurrentFunds] = useState();
  const [address, setAddress] = useState();
  const [connected, setConnected] = useState(false);
  const [publisherData, setPublisherData] = useState([])
  const [adsPublisherData, setAdsPublisherData] = useState([])

  const { account } = useAccount();
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const closePopUp = (e) => {
      if (e.target.id == "background") {
        props.closeHandler(false);
      }
    };
    setAddress("0x09446c630E1F285F14476aea9E78Ce08A2De565D");
    document.body.addEventListener("click", closePopUp);

    if (account != undefined) {
      setConnected(true);
      setAddress(account);
    }

    return () => document.body.removeEventListener("click", closePopUp);
  });

  const onClickHandler = (e) => {
    props.closeHandler(false);
  };

  const handleChange = (event) => {
    setCampaign(event.target.value);
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
      let id = props.data.Publishers[i]
      for (let i = 0; i < publisherData.length; i++) {
        if (publisherData[i].publisherId == id) {
          obj["adPublisherId"] = id;
          obj["adPublisherAddress"] = publisherData[i].publisherAddress;
          obj["adPublisherSite"] = publisherData[i].publisherSite;
          console.log(obj)
        }
      }
      console.log(obj)
      tempChoicesArray.push(obj);
    }
    setAdsPublisherData(tempChoicesArray);
  }, [props, publisherData]);

  useEffect(() => {
    initilizeloop();
  }, [props])

  useEffect(() => {
    initilizeloop2();
  }, [props, publisherData])

  console.log(adsPublisherData)

  return (
    <div id="background" className={styles.popUp}>
      <div className={styles.popUpInner}>
        <CloseRoundedIcon className={styles.close} onClick={onClickHandler} />
        <div className={styles.adImage}>
          <img src={props.data.ImgLink} alt="ad image" />
          <div>{props.data.name}</div>
          <div>{props.data.Description}</div>
        </div>
        <div>
          <div className={styles.control}>
            <button className={styles.button} type="button" onClick={() => { props.setRunning(false) }}>
              <StopCircleOutlinedIcon /> Stop
            </button>
            <button className={styles.button} type="button" onClick={() => { props.setRunning(true) }}>
              <PlayArrowOutlinedIcon /> Start
            </button>
          </div>
          <div className={styles.fundsDisplay}>
            <div>
              <div>Total Funds </div>
              <h3>{props.data.totalFunds} ETH</h3>
            </div>
            <div>
              <div>Current Funds</div>
              <h3>{props.data.CurrentFunds} ETH</h3>
              <div>
                <button className={styles.button} type="button">Buy AdToken</button>
                <button className={styles.button} type="button">Swap AdToken</button>
              </div>
            </div>
          </div>
          <div className={styles.publisher}>
            <div>
              <button className={styles.button} type="button">
                <StopCircleOutlinedIcon /> Subscribe
              </button>
              <button className={styles.button} type="button">
                <PlayArrowOutlinedIcon /> UnSubscribe
              </button>
            </div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Publishers
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={campaign}
                onChange={handleChange}
                input={<BootstrapInput />}
                label="Publisher"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {adsPublisherData.map((data, index) => {
                  return (
                    <MenuItem value={data.adPublisherAddress} key={index}>{data.adPublisherSite}</MenuItem>
                  )
                })
                }
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
