import Header from '../components/Header/Index'
import '../styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, mainnet, optimism, polygon, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, injectedWallet, rainbowWallet, walletConnectWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";

import { ArcanaConnector } from "@arcana/auth-wagmi";

const ArcanaRainbowConnector = ({ chains }) => {
  return {
    id: "arcana-auth",
    name: "Arcana Wallet",
    iconUrl: "https://media.licdn.com/dms/image/C4D0BAQFnmnmr4ZrjUQ/company-logo_200_200/0/1663061019048?e=1684368000&v=beta&t=Km-ii4HJitQr9GRB0LF4IVmWkWX52Z1QGLSZ6PiRkC0",
    iconBackground: "#101010",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          // appId parameter refers to App Address value in the Dashboard
          appId: "51d1846eb0f2283b7bc7cb36f2032d0c1c6c8f9e",
        },
      });
      return {
        connector,
      };
    },
  };
};

const connectors = (chains) =>
  connectorsForWallets([
    {
      groupName: "AdChain",
      wallets: [ArcanaRainbowConnector({ chains }), metaMaskWallet({ chains }), injectedWallet({chains}), rainbowWallet({chains}), walletConnectWallet({chains}), coinbaseWallet({chains})]
    },
  ]);

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
// const { connectors } = getDefaultWallets({
//   appName: "AdChain",
//   chains
// });

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider
});

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={midnightTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  )
}

export default MyApp
