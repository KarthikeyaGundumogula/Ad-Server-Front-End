import Head from 'next/head'
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ethers } from "ethers";
import { IoWallet } from 'react-icons/io5'
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const getEthereumObject = () => window.ethereum;

  const [currentAccount, setCurrentAccount] = useState(null);

  const findMetaMaskAccount = async () => {
    try {
      const ethereum = getEthereumObject();

      /*
       * First make sure we have access to the Ethereum object.
       */
      if (!ethereum) {
        console.error("Make sure you have Metamask!");
        return null;
      }

      console.log("We have the Ethereum object", ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        return account;
      } else {
        console.error("No authorized account found");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts)
      if (accounts.length !== 0) {
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
        router.reload()
      } else {
        setCurrentAccount(null)
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    const getUser = async () => {
      const account = await findMetaMaskAccount();
      if (account !== null) {
        setCurrentAccount(account);
      } else {
        setCurrentAccount(null)
      }
    };
    getUser()

  }, [currentAccount])

  return (
    <div className={styles.container}>
      <Head>
        <title>AdChain</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to AdChain
        </h1>
        {currentAccount != null
          ? <></>
          : <button className={`${styles.custombtn} ${styles.btn16}`} onClick={connectWallet} >connect wallet <IoWallet /></button>
        }
        {currentAccount != null
          ? <h5>logged in using wallet adddress {currentAccount}</h5>
          : <></>
        }
      </main>

      <footer className={styles.footer}>
        made with &#10084;&#65039; in EthforAll
      </footer>
    </div>
  )
}