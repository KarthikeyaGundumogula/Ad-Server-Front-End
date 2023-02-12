import styles from "./Index.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from "react";
import { IoWallet } from 'react-icons/io5'
import { useAccount } from "wagmi";

const Header = () => {
    const router = useRouter();

    const getEthereumObject = () => window.ethereum;

    const { address } = useAccount()

    const [ethAccount, setEthAccount] = useState(null)

    useEffect(() => {

        setEthAccount(address)

    }, [ethAccount, address])

    return (
        <div className={styles.navdiv}>
            <ul className={styles.navbar}>
                <Link href="/" className={styles.pageslink}>
                    <li className={styles.logo}>
                        AdChain
                    </li>
                </Link>
                <Link href="/create" className={styles.pageslink}>
                    <li className={styles.navtext}>Create</li>
                </Link>
                <Link href="/manage" className={styles.pageslink}>
                    <li className={styles.navtext}>Manage</li>
                </Link>
                <Link href="/settings" className={styles.pageslink}>
                    <li className={styles.navtext}>Settings</li>
                </Link>
                <Link href="/login" className={styles.pageslink}>
                    {ethAccount != null
                        ? <li className={styles.navtext}>
                            <Tooltip title={ethAccount}>
                                <Avatar alt="user" src="https://api.dicebear.com/5.x/identicon/svg?seed=Cuddles" />
                            </Tooltip>
                        </li>
                        : <li>
                            <button className={`${styles.custombtn} ${styles.btn16}`} >connect wallet <IoWallet /></button>
                        </li>
                    }
                </Link>
            </ul>
        </div>
    );
};

export default Header;