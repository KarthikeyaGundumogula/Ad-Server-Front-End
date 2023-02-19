import { useState } from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import styles from "./Index.module.css";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "rgb(200,155,123)",
  },
  "& label": {
    color: "rgb(204,90,113)",
  },
  "& .MuiInput-underlineafter": {
    borderBottomColor: "rgb(200,155,123)",
  },
  "& .MuiInput-underlinebefore": {
    borderBottomColor: "rgb(204,90,113)",
  },
});

function Docs() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Documentation</h1>
      <div className={styles.text}>
        <h1>Introduction</h1>
        Our ad server project is a decentralized solution for serving ads that
        leverages blockchain technology to improve the efficiency, transparency,
        and security of digital advertising. Our project is designed to address
        the limitations of traditional, centralized ad-serving models, which can
        be slow, unreliable, and subject to fraud.
        <h1>Architecture</h1>
        Our ad server project consists of several components, including
        <h3>Advertisers</h3> Advertisers create ads and subscribe to publishers
        availble on the platform then submit them to the ad server for
        distribution.
        <h3>Publishers</h3> Publishers display the ads on their websites and
        receive payment for ad impressions or clicks.
        <h3>Decentralized Ad Server</h3> The decentralized ad server is built on
        a blockchain, where advertisers can submit ads and can select on which
        Websites to display.
        <br />
        The ad server uses smart contracts to ensure that ads are delivered to
        the intended audience, and payments are made accurately and
        transparently. Each ad is an NFT and is assigned a unique identifier,
        which is used to track its performance and ensure that advertisers
        receive the appropriate payment for their ads.
        <h1>Technical Details</h1>
        Our ad server is built using the Ethereum blockchain and uses the
        following tools and technologies
        <h3>Solidity</h3> A programming language used to write smart contracts
        on the Ethereum blockchain.
        <h3>Hardhat</h3> A development framework for building decentralized
        applications on the Ethereum network.
        <h3>Polygon</h3>Polygon is a Layer 2 scaling solution for Ethereum,
        which we have integrated into our ad-server project. By leveraging
        Polygon, we can significantly reduce the transaction fees and latency
        associated with using the Ethereum blockchain for our ad-server
        transactions. With Polygon, we can execute smart contracts faster and at
        a much lower cost, which is critical for processing a large number of ad
        impressions and payments in real-time. We have built our ad server on
        the Polygon network to take advantage of its scalabi
        <h3>IPFS</h3> A distributed file system used to store ad content and
        other data. When an advertiser creates an ad, they upload the ad content
        to IPFS and submit it to the ad server contract on the Ethereum
        blockchain. Publishers can then access the ad content and display it on
        their websites. Each ad impression or click is recorded on the
        blockchain, and the corresponding payment is made automatically.
        <h3>Arcana</h3>Arcana is a decentralized wallet that we have integrated
        into our ad-server project. Users can securely store their
        cryptocurrency and other digital assets in Arcana, which is built on a
        blockchain to ensure transparency and security.
        <h3>The Graph Protocol</h3>The Graph Protocol is a decentralized
        indexing and query system for blockchain data, which we have integrated
        into our ad-server project. By leveraging the Graph Protocol, we can
        efficiently store and query data related to ad impressions, clicks, and
        payments on the blockchain.
        <h3>Benefits</h3>
        Our ad server project provides several benefits over traditional
        ad-serving models, including
        <h3>Decentralization</h3> The ad server is decentralized, meaning that
        there is no single point of failure and the system is resistant to fraud
        and manipulation.
        <h3>Efficiency</h3> Advertisers can easily track the performance of
        their ads, and publishers can receive payment quickly and transparently.
        <h3>Transparency</h3> The blockchain provides a transparent record of
        all ad impressions and payments, ensuring accountability and reducing
        the risk of fraud.
        <h3>Privacy</h3> Users can have full control over their data and
        privacy, with no need to share personal information with centralized
        ad-serving platforms.
        <h1>Conclusion</h1>
        Our decentralized ad server project is an innovative solution that has
        the potential to disrupt the traditional ad-serving industry and create
        a more fair and equitable digital advertising ecosystem. By leveraging
        blockchain technology, we can create a more efficient, transparent, and
        secure way to serve ads on the internet.
      </div>
    </div>
  );
}
export default Docs;
