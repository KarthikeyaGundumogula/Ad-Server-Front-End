import styles from "./Index.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from "react";

const Header = () => {
    const router = useRouter();
    const getEthereumObject = () => window.ethereum;

    const [ethAccount, setEthAccount] = useState(null)

    useEffect(() => {

        const getUser = async () => {
            const ethereum = getEthereumObject();
            const accounts = await ethereum.request({ method: "eth_accounts" });
            const account = accounts[0];
            if (account !== null) {
                setEthAccount(account);
            } else {
                setEthAccount(null)
            }
        };
        getUser()

    }, [ethAccount])

    return (
        <div className={styles.navdiv}>
            <ul className={styles.navbar}>
                <Link href="/" className={styles.pageslink}>
                    <li className={styles.logo}>
                        Meta Ad
                    </li>
                </Link>
                {/* <Link href="/questions" className={styles.pageslink}> */}
                <li className={styles.navtext}>Create</li>
                {/* </Link> */}
                {/* <li className={styles.logo}>
          <img src="/static/settings/fire.png" className={styles.logoImg} />
        </li> */}
                {/* <li className={styles.navtext}>Hot Questions</li> */}
                {/* <li className={styles.logo}>
          <img src="/static/settings/ask.png" className={styles.logoImg} />
        </li> */}
                <Link href="/manage" className={styles.pageslink}>
                    <li className={styles.navtext}>Manage</li>
                </Link>
                {/* <li className={styles.logo}>
          <img src="/static/settings/polls.png" className={styles.logoImg} />
        </li> */}
                <Link href="/settings" className={styles.pageslink}>
                    <li className={styles.navtext}>Settings</li>
                </Link>
                {/* <li className={styles.logo}>
          <img src="/static/settings/search.png" className={styles.logoImg} />
        </li> */}
                {/* <Link href="/search" className={styles.pageslink}> */}
                {ethAccount != null
                    ? <li className={styles.navtext}>
                        <Tooltip title={ethAccount}>
                            <Avatar alt="user" src="https://api.dicebear.com/5.x/identicon/svg?seed=Cuddles" />
                        </Tooltip>
                    </li>
                    : <li></li>
                }

                {/* </Link> */}

            </ul>
        </div>
    );
};

export default Header;