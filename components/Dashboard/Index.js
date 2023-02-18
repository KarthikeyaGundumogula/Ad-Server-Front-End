import styles from "./Index.module.css";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";
import InputBase from "@mui/material/InputBase";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import AdDetails from "./AdPopUp/AdPopUp";
import { AddShoppingCart, TroubleshootOutlined } from "@mui/icons-material";

export default function Dashboard() {
  const Contract_ABI = process.env.NEXT_PUBLIC_Server_ABI;
  const Contract_Address = process.env.NEXT_PUBLIC_Server_ADDRESS;
  const [campaign, setCampaign] = useState();
  const [selected, setSelected] = useState(false);
  const [running, setRunning] = useState(false);
  const [ads, setAds] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [selectedAd, setSelectedAd] = useState();
  const [loading, setLoading] = useState(false);
  const [EthAccount, setEthAccount] = useState();
  const [balance, setBalance] = useState("");
  let { address } = useAccount();

  const handleChange = (event) => {
    setCampaign(event.target.value);
  };

  const fetchdata = async () => {
    const response = await fetch(
      "https://api.thegraph.com/subgraphs/name/karthikeyagundumogula/ad-serverv2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
                {
                    ads(where:{Advertiser:"${address}"}) {
                        AdData
                        AdId
                        Advertiser
                        CurrentFunds
                        Publishers
                        TotalClicks
                        TotalFunds
                        TotalViews
                        id
                        isRunning
                    }
                    publishers {
                        id
                        PublisherId
                        Publisher
                        TotalEarnings
                        Advertisers
                        ClickReward
                        ViewReward
                        TotalViews
                        TotalClicks
                        PublisherSite
                    }
                  }
    `,
        }),
      }
    );
    const result = await response.json();
    console.log("result", result.data.ads.length);
    setAds(result.data.ads);
    setPublisher(result.data.publishers);
  };

  const forloop = useCallback(async () => {
    setLoading(true);
    const tempChoicesArray = [];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < ads.length; i++) {
      let obj = {};
      const newresponse = await fetch(ads[i].AdData, requestOptions);
      const adsresult = await newresponse.json();
      obj = { ...adsresult, ...ads[i] };
      tempChoicesArray.push(obj);

      setLoading(false);
    }
    setAdsData(tempChoicesArray);
  }, [ads, adsData]);

  useEffect(() => {
    fetchdata();
    async function setAcc() {
      if (address != undefined) {
        console.log(address);
        await setEthAccount(address);
      } else {
        console.log("no account");
      }
    }
    setAcc();
  }, [address]);

  const getContractDetails = async () => {
    try {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const server = await new ethers.Contract(
        Contract_Address,
        Contract_ABI,
        signer
      );
      return server;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (ads.length > 0) {
      forloop();
    }
  }, [ads]);
  useEffect(() => {
    async function getTokens() {
      try {
        const server = await getContractDetails();
        const Balance = await server.balanceOf(address, 0);
        setBalance(ethers.utils.formatEther(Balance));
      } catch (err) {
        console.log(err);
      }
    }
    getTokens();
  }, [balance]);

  const selectedImageHandler = useCallback(
    (idx) => {
      setSelectedAd(idx);
    },
    [selectedAd, selected]
  );

  const currentImageHandler = (index) => {
    setSelected(!selected);
    selectedImageHandler(index);
  };

  const selectedHandler = (props) => {
    setSelected(props);
  };
  const handleGetAdToken = async () => {
    try {
      const server = await getContractDetails();
      const tx = await server.getAdTokens(
        EthAccount,
        ethers.utils.parseEther("100")
      );
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.Dashboard}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={styles.totalFunds}>
        <div>
          <h1 className={styles.h1}>Total Funds</h1>
          <h3 className={styles.h3}>{balance}</h3>
          <h5 className={styles.h5}>ETH</h5>
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={handleGetAdToken}
        >
          Get AdToken
        </button>
      </div>
      {adsData.map((data, index) => {
        return (
          <div
            className={styles.datacontainer}
            key={index}
            onClick={() => {
              setSelected(true);
              currentImageHandler(index);
            }}
          >
            {data.isRunning ? (
              <span
                className={`${styles.runningbadge} ${styles.runningpulsate}`}
              />
            ) : (
              <span className={`${styles.stoppedbadge} ${styles.pulsate}`} />
            )}
            <img src={data.ImgLink} alt="ad banner" />
            <div className={styles.adDescription}>
              <div>{data.name}</div>
              <div>{data.Description}</div>
            </div>
          </div>
        );
      })}
      {selected == true ? (
        <AdDetails
          closeHandler={selectedHandler}
          data={adsData[selectedAd]}
          className={styles.popUp}
          setRunning={setRunning}
          publisher={publisher}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
