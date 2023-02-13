import styles from "./Index.module.css"
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

import InputBase from '@mui/material/InputBase';
import { useState } from "react";

// import Lottie from 'react-lottie';
// import animationData from '../lotties/Ad';

export default function Dashboard() {

    const [campaign, setCampaign] = useState()

    const handleChange = (event) => {
        setCampaign(event.target.value);
    };

    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice"
    //     }
    // };

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

    return (
        <div className={styles.Dashboard}>
            <div className={styles.datacontainer}>
                <span className={`${styles.stoppedbadge} ${styles.pulsate}`} />
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            <div className={styles.datacontainer}>
                <span className={`${styles.stoppedbadge} ${styles.pulsate}`} />
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            <div className={styles.datacontainer}>
                <span className={`${styles.runningbadge} ${styles.runningpulsate}`} />
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            <div className={styles.datacontainer}>
                <span className={`${styles.runningbadge} ${styles.runningpulsate}`} />
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
            <div className={styles.datacontainer}>
                <img src="https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="ad banner" />
                <div>Ad Name</div>
            </div>
        </div>
    )
}