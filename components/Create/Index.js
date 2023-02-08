import styles from "./Index.module.css";
import { Web3Storage } from "web3.storage";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

export default function Create() {
    const API_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIyOTMzRDhDM2Y5MzkyRjI2MDNjZDZiQUFBZTczRjJhNjNCRjcxYjEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3OTk3MjYxOTEsIm5hbWUiOiJBZCBzZXJ2ZXIifQ.bGUQJrYJIA4ugMI_gPUQxHMLPTFuCs0xgkgFK-kBaXw";

    const client = new Web3Storage({ token: API_TOKEN });

    const [file, setFile] = useState("");

    const [filename, setFilename] = useState([]);

    const [allfile, setAllfile] = useState({});

    const clickReward = useRef();
    const displayReward = useRef();
    const totalFunds = useRef();
    const AdName = useRef();

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'rgb(200,155,123)',
        },
        '& label': {
            color: 'rgb(228,200,208)',
        },
        '& placeholder': {
            color: 'rgb(215,173,184)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(200,155,123)',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'rgb(228,200,208)',
        },
    });

    const handleUpload = async () => {
        var fileInput = ipfs_file;

        const rootCid = await client.put(fileInput.files, {
            name: "Advertisement banner",
        });

        console.log(rootCid);

        const res = await client.get(rootCid);
        const files = await res.files();
        console.log(files);
        const url = URL.createObjectURL(files[0]);
        console.log(url);
        setFile(url);
    };
    const forloop = useCallback(() => {
        let temp = []
        for (let i = 0; i < allfile.length; i++) {

            temp.push(allfile[i].name);
        }
        setFilename(temp)
    }, [allfile])

    useEffect(() => {
        forloop();
    }, [allfile]);

    console.log(filename);

    function uploadFile() {
        document.getElementById("ipfs_file").click();
    }

    // const deletefile = useCallback((idx) => {
    //     setFilename((prev) => delete allfile);
    // }, []);

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
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <CssTextField
                                id="standard-basic"
                                variant="standard"
                                ref={clickReward}
                                placeholder="Reward you want to give for clicking on Ad"
                                type="number"
                                label="Reward for Clicks on Ad"
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
                                onChange={e => setDisplayReward(e.target.value)}
                                placeholder="Reward you want to give for displaying Ad"
                                type="number"
                                label="Reward for Displaying Ad"
                                required
                                fullWidth
                            />
                            <Tooltip title="Reward you want to give for displaying Ad">
                                <InfoOutlinedIcon />
                            </Tooltip>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <CssTextField
                                id="standard-basic"
                                // label="Outlined"
                                variant="standard"
                                ref={totalFunds}
                                onChange={e => setTotalFunds(e.target.value)}
                                placeholder="Total Fund for Campaign"
                                type="number"
                                label="Total Funds"
                                required
                                fullWidth
                            />
                            <Tooltip title="Total Fund for Campaign">
                                <InfoOutlinedIcon />
                            </Tooltip>
                        </div>
                        <div className={styles.uploadFile}>
                            <div className={styles.text}>upload files</div>
                            {allfile.length > 0 && <div className={styles.text}>{allfile.length} files choosen</div>}
                            <input
                                id="ipfs_file"
                                type="file"
                                multiple={true}
                                style={{ display: "none" }}
                                onChange={() => {
                                    setAllfile(ipfs_file.files);
                                }}
                            />
                            <button className={styles.button} type="button" onClick={uploadFile}>
                                choose files
                            </button>
                            <button className={styles.button} type="button" onClick={handleUpload}>
                                Submit
                            </button>
                        </div>
                        <div className={styles.choosenfile}>
                            {filename.length > 0 && <div className={styles.text} style={{ textDecoration: "underline" }}>Selected file</div>}
                            <div>
                                {filename.length > 0 && (
                                    filename.map((file, idx) => {
                                        return (
                                            <div className={styles.filename}>
                                                <div className={styles.text} key={idx} >{file}</div>
                                                {/* <RemoveCircleOutlineOutlinedIcon style={{ fontSize: "medium" }} /> */}
                                            </div>

                                        )
                                    })
                                )
                                }
                            </div>

                        </div>
                    </form>
                </div >
            </div >
            <div className={styles.textContainer}>
                Create <br></br>
                Your Ad  <br></br>
                Campaign
            </div>
        </div>

        /* <div className={styles.dataContainer}>
                        <Image alt="hi" src={file} width={250} height={250} />
                    </div> */
    );
}
