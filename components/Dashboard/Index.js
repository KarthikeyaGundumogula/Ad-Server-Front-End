import styles from "./Index.module.css"

export default function Dashboard() {
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
                        <button className={styles.button} type="button">Add Funds</button>
                        <button className={styles.button} type="button">Remove Funds</button>
                    </div>
                </div>
                <div className={styles.otherData}>
                    <div className={styles.dataContainer}>
                        <div className={styles.text}>hello</div>
                        <button className={styles.button} type="button">Submit</button>
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.text}>hello</div>
                        <button className={styles.button} type="button">Submit</button>
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
            </div>
        </div>
    )
}