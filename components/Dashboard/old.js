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
    </div>
</div>