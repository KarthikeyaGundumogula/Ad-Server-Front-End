import styles from "./Index.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from "react";
import { IoWallet } from 'react-icons/io5'
import { useAccount } from "wagmi";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

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
                    <li className={styles.navtext}><CreateRoundedIcon /> Create</li>
                </Link>
                <Link href="/manage" className={styles.pageslink}>
                    <li className={styles.navtext}><DashboardRoundedIcon /> Dashboard</li>
                </Link>
                <Link href="/settings" className={styles.pageslink}>
                    <li className={styles.navtext}>< ManageAccountsRoundedIcon /> Settings</li>
                </Link>
                <Link href="/login" className={styles.pageslink}>
                    {ethAccount != null
                        ? <li >
                            <Tooltip title={ethAccount}>
                                <Avatar alt="user" src="https://api.dicebear.com/5.x/identicon/svg?seed=Cuddles" />
                            </Tooltip>
                        </li>
                        : <li className={styles.navtext}>
                            <LoginRoundedIcon /> Login
                        </li>
                    }
                </Link>
            </ul>
        </div>
    );
};

export default Header;