import styles from "./Index.module.css"
import { styled } from '@mui/material/styles';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
// import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

import InputBase from '@mui/material/InputBase';
import { useEffect, useState } from "react";

import AdDetails from "./AdPopUp/AdPopUp";

export default function Dashboard() {

    const [campaign, setCampaign] = useState()
    const [selected, setSelected] = useState(false)

    const handleChange = (event) => {
        setCampaign(event.target.value);
    };

    useEffect(() => {
        fetch('https://api.thegraph.com/subgraphs/name/karthikeyagundumogula/ad-serverv2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    {
                        ad {
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
            .then(res => res.json())
            .then(res => console.log(res.data));
    }, [])

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            color: '#C89B7B',
        },
        '& .MuiInputBase-input': {
            position: 'relative',
            borderBottom: '1px solid #ced4da',
            borderColor: '#C89B7B',
            fontSize: 20,
            padding: '12px 12px 2px 12px',
            color: '#C89B7B',
            // Use the system font instead of the default Roboto font.
            '&:focus': {
                borderColor: '#C89B7B',
                color: '#C89B7B',
            },
        },
    }));

    const selectedHandler = (props) => {
        setSelected(props)
    }

    return (
        <div className={styles.Dashboard}>
            <div className={styles.datacontainer} onClick={() => setSelected(true)}>
                <span className={`${styles.stoppedbadge} ${styles.pulsate}`} />
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            <div className={styles.datacontainer} onClick={() => setSelected(true)}>
                <span className={`${styles.stoppedbadge} ${styles.pulsate}`} />
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            <div className={styles.datacontainer} onClick={() => setSelected(true)}>
                <span className={`${styles.runningbadge} ${styles.runningpulsate}`} />
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            <div className={styles.datacontainer} onClick={() => setSelected(true)}>
                <span className={`${styles.runningbadge} ${styles.runningpulsate}`} />
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            <div className={styles.datacontainer} onClick={() => setSelected(true)}>
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            {selected == true
                ? <AdDetails closeHandler={selectedHandler} className={styles.popUp} />
                : <div></div>
            }
        </div>
    )
}