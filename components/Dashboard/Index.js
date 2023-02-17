import styles from "./Index.module.css";
import { styled } from "@mui/material/styles";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import InputBase from "@mui/material/InputBase";
import { useCallback, useEffect, useState } from "react";

import AdDetails from "./AdPopUp/AdPopUp";
import { AddShoppingCart, TroubleshootOutlined } from "@mui/icons-material";

export default function Dashboard() {

  const [campaign, setCampaign] = useState();
  const [selected, setSelected] = useState(false);
  const [running, setRunning] = useState(false)
  const [ads, setAds] = useState([])
  const [publisher, setPublisher] = useState([])
  const [adsData, setAdsData] = useState([])
  const [selectedAd, setSelectedAd] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setCampaign(event.target.value);
  };

  const fetchdata = async () => {
    const response = await fetch('https://api.thegraph.com/subgraphs/name/karthikeyagundumogula/ad-serverv2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
                {
                    ads {
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
    `
      })
    })
    const result = await response.json()
    setAds(result.data.ads)
    setPublisher(result.data.publishers)
    console.log(result)

  }

  const forloop = useCallback(async () => {

    setLoading(true)
    const tempChoicesArray = [];
    console.log("he")

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < ads.length; i++) {
      let obj = {}
      console.log("sent...")
      const newresponse = await fetch(ads[i].AdData, requestOptions)
      const adsresult = await newresponse.json()
      console.log(adsresult)
      console.log(ads[i])
      obj = { ...adsresult, ...ads[i] }
      tempChoicesArray.push(obj);

      setLoading(false)
    }
    setAdsData(tempChoicesArray);

  }, [ads, adsData])


  console.log(loading)

  useEffect(() => {

    fetchdata()
    console.log("loading...")

  }, [])

  useEffect(() => {
    forloop()
  }, [ads])

  console.log(adsData)

  const selectedImageHandler = useCallback((idx) => {
    setSelectedAd(idx)
  }, [selectedAd, selected])

  const currentImageHandler = (index) => {

    setSelected(!selected)
    selectedImageHandler(index)
  }

  console.log(selectedAd)

  const selectedHandler = (props) => {
    setSelected(props);
  };

  return (
    <div className={styles.Dashboard}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={styles.totalFunds}>
        <div>
          <h1 className={styles.h1}>Total Funds</h1>
          <h3 className={styles.h3}>0</h3>
          <h5 className={styles.h5}>ETH</h5>
        </div>
        <button className={styles.button} type="button">Get AdToken</button>
      </div>
      {adsData.map((data, index) => {
        return (
          <div className={styles.datacontainer} key={index} onClick={() => {
            setSelected(true)
            currentImageHandler(index)
          }
          }>
            {data.isRunning
              ? <span className={`${styles.runningbadge} ${styles.runningpulsate}`} />
              : <span className={`${styles.stoppedbadge} ${styles.pulsate}`} />
            }
            <img
              src={data.ImgLink}
              alt="ad banner"
            />
            <div className={styles.adDescription}>
              <div>{data.name}</div>
              <div>{data.Description}</div>
            </div>
          </div>
        )
      })}
      {selected == true ? (
        <AdDetails closeHandler={selectedHandler} data={adsData[selectedAd]} className={styles.popUp} setRunning={setRunning} publisher={publisher} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
