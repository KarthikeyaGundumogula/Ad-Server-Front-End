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

import Lottie from 'react-lottie';
import animationData from '../lotties/Ad';

export default function Dashboard() {

    const [campaign, setCampaign] = useState()

    const handleChange = (event) => {
        setCampaign(event.target.value);
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

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
            <div className={styles.mainContainer}>
                <div className={styles.fundsDisplay}>
                    <div>
                        <div>
                            Total <br></br>
                            Funds
                        </div>
                        <div>
                            <h1>0</h1>
                            <div>ETH</div>
                        </div>
                    </div>
                    <div>
                        <button className={styles.button} type="button">Buy AdToken</button>
                        <button className={styles.button} type="button">Swap AdToken</button>
                    </div>
                </div>
                <div className={styles.otherData}>
                    <div className={styles.dataContainer} style={{ gridColumn: "span 2" }}>
                        <div>
                            <button className={styles.button} type="button"><StopCircleOutlinedIcon />   Stop</button>
                            <button className={styles.button} type="button"><PlayArrowOutlinedIcon />   Start</button>
                        </div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-standard-label">Ad Campaign</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={campaign}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                label="Ad Campaign"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.text}>hello</div>
                        <button className={styles.button} type="button">Submit</button>
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.text}>hello</div>
                        <button className={styles.button} type="button">Submit</button>
                    </div>
                </div>
                <div className={styles.publisher}>
                    <div>
                        <button className={styles.button} type="button"><StopCircleOutlinedIcon />   Stop</button>
                        <button className={styles.button} type="button"><PlayArrowOutlinedIcon />   Start</button>
                    </div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-standard-label">Publishers</InputLabel>
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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={300}
                    />
                </div>
            </div>
        </div>
    )
}