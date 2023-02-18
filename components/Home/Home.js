import styles from "./Home.module.css"

export default function HomePage() {
    return (
        <div className={styles.main}>
            <div className={styles.intro}>
                <div className={styles.name}>AdChain</div>
                <div className={styles.description}>A Better Way to Advertise
                    secure, Decentralized,<br></br> Privacy-Focused</div>
                <div className={styles.description2}>Our system is designed to make advertising and managing your
                    Ad easy while leveraging<br></br> the potential of web3 ecosystem </div>
            </div>
            <div className={styles.working}>
                <div className={styles.heading}>How It Works</div>
                <div className={styles.workingSection}>
                    <div>
                        <div className={styles.workingSubheading}>you do the steps,
                            we manage your <div className={styles.workingSubheadingGrowth}>Growth . </div></div>
                        <div className={styles.workingText}>our system is powered by blockchain and various web3 services to ensure your privacy is protected and your advertisement reach target audience</div>
                    </div>
                    <div className={styles.workingstepsContainer}>
                        <div className={styles.workingsteps}><div>Register</div><div>register using your wallet or with email by choosing arcana wallet as option</div>  </div>
                        <div className={styles.workingsteps}><div>Register</div><div>register using your wallet or with email by choosing arcana wallet as option</div>  </div>
                        <div className={styles.workingsteps}><div>Register</div><div>register using your wallet or with email by choosing arcana wallet as option</div>   </div>
                    </div>
                </div>
            </div>
            <div className={styles.working}>
                <div className={styles.heading}>Benefits</div>
                
            </div>
            <div className={styles.working}>
                <div className={styles.heading}>Technologies Used</div>
                
            </div>
        </div>
    )
}