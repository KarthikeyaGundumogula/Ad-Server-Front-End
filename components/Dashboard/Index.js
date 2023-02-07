import styles from "./Index.module.css"

export default function Dashboard() {
    return (
        <div className={styles.Dashboard}>
            <div className={styles.mainContainer}>
                <div className={styles.dataContainer}>
                    <div>hello</div>
                    <button className={styles.button} type="button">Submit</button>
                </div>
                <div className={styles.dataContainer}>
                    <div>hello</div>
                    <button className={styles.button} type="button">Submit</button>
                </div>
                <div className={styles.dataContainer}>
                    <div>hello</div>
                    <button className={styles.button} type="button">Submit</button>
                </div>
                <div className={styles.dataContainer}>
                    <div>hello</div>
                    <button className={styles.button} type="button">Submit</button>
                </div>
                <div className={styles.dataContainer}>
                    <div>hello</div>
                    <button className={styles.button} type="button">Submit</button>
                </div> 
            </div>
        </div>
    )
}