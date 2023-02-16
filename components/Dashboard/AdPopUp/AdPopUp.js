import { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styles from './AdPopUp.module.css'
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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

const AdDetails = (props) => {

    const [campaign, setCampaign] = useState()

    useEffect(() => {
        const closePopUp = (e) => {
            if (e.target.id == "background") {

                props.closeHandler(false)

            }
        }

        document.body.addEventListener("click", closePopUp)

        return () => document.body.removeEventListener("click", closePopUp)

    })

    const onClickHandler = (e) => {

        props.closeHandler(false)

    }

    const handleChange = (event) => {
        setCampaign(event.target.value);
    };


    return (
        <div id="background" className={styles.popUp}>
            <div className={styles.popUpInner}>
                <CloseRoundedIcon className={styles.close} onClick={onClickHandler} />
                <div className={styles.control}>
                    <button className={styles.button} type="button"><StopCircleOutlinedIcon />   Stop</button>
                    <button className={styles.button} type="button"><PlayArrowOutlinedIcon />   Start</button>
                </div>
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
                <div className={styles.publisher}>
                    <div>
                        <button className={styles.button} type="button"><StopCircleOutlinedIcon />  Subscribe</button>
                        <button className={styles.button} type="button"><PlayArrowOutlinedIcon />   UnSubscribe</button>
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
                </div>
            </div>
        </div>
    )

}

export default AdDetails;