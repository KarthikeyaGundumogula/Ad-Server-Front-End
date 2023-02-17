import Head from 'next/head'
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ethers } from "ethers";
import { IoWallet } from 'react-icons/io5'
import { useRouter } from "next/router";
import HomePage from '../components/Home/Home';

export default function Home() {
  return(
    <HomePage />
  )
}
